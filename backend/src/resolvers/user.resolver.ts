import { ApolloError } from "apollo-server-errors";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User, UserInfo, UserRoleType } from "../entities/user.entity";
import { InputUserCreate, InputUserLogin } from "../inputs";
import { UserService } from "../services/user.service";

// class PasswordValidationError extends Error {
//    constructor(message: string) {
//      super(message);
//      this.name = "PasswordValidationError";
//    }
//  }


@Resolver()
export default class UserResolver {
   private userService = new UserService();

   @Authorized("admin")
   @Query(() => [User])
   async getAllUsers(): Promise<User[]> {
      return this.userService.getAllUsers();
   }

   @Authorized("admin")
   @Mutation(() => String)
   async deleteUser(@Arg("userId") userId: string): Promise<string> {
      return this.userService.deleteUser(userId);
   }

   //   @Mutation(() => User)
   //   async createUser(@Arg("inputUser") inputUser: InputUserCreate): Promise<User> {
   //     return this.userService.createUser(inputUser);
   //   }

   @Mutation(() => String)
   async register(
      @Arg("newUserData") newUserData: InputUserCreate
   ): Promise<string> {
      try {
         const existingUser = await User.findOne({
            where: [{ email: newUserData.email }],
         });

         this.validateEmail(newUserData.email)
         this.validatePassword(newUserData.password)
         this.validateUsername(newUserData.username)
         this.validateExistingUser(existingUser)

         const newUser = User.create({
            email: newUserData.email,
            username: newUserData.username,
            hashedPassword: await argon2.hash(newUserData.password),
            role: "user",
         })
         await newUser.save();
         return "New user has been created with success";
      } catch (err) {
         if (err instanceof ApolloError) {
            throw err
         } else {
            console.error("Error while creating new user :", err);
            throw new Error("Error while creating new user");
         }
      }
   }

   @Query(() => String)
   async loginUser(
      @Arg("inputUserLogin") inputUserLogin: InputUserLogin
   ): Promise<string> {
      let payload: { email: string; role: UserRoleType; username: string };
      try {
         const user = await User.findOne({
            where: { email: inputUserLogin.email },
         });
         if (!user) throw new Error("User not found");
         if (!(await argon2.verify(user.hashedPassword, inputUserLogin.password))) { throw new Error("Invalid password") }
         payload = { email: user.email, role: user.role, username: user.username };
         const token = jwt.sign(payload, "mysupersecretkey", { expiresIn: '12h' });

         console.log("-------- Token in user.resolver.ts ------- : ", token);
         console.log("------ Payload in user.resolver.ts ------ : ", payload);

         return token;
      } catch (error) { throw new Error(error.message) }
   }

   @Query(() => Boolean)
   async checkUserExistence(
      @Arg("username") username: string,
      @Arg("email") email: string
   ): Promise<boolean> {
      return this.userService.checkUserExistence(username, email);
   }

   // @Authorized("admin")
   @Query(() => String)
   async adminQuery() {
      return "Your are admin";
   }

   @Query(() => User, { nullable: true })
   async getUserProfile(@Ctx() ctx: { email: string }): Promise<User | null> {
      if (!ctx.email) {
         throw new Error("User not authenticated");
      }
      return this.userService.getUserByEmail(ctx.email);
   }

   @Query(() => UserInfo)
   async whoAmI(@Ctx() ctx: { email: string; role: string }) {
      if (ctx.email !== undefined) {
         return { ...ctx, isLoggedIn: true };
      } else {
         return { isLoggedIn: false };
      }
   }



   private validateEmail(email: string): void {
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      if (!regex.test(email)) throw new ApolloError("Apollo Error : Veuillez saisir une adresse mail valide.");
   }

   private validateExistingUser(existingUser: User | null): void {
      if (existingUser) throw new ApolloError("Apollo Error : Ce mail existe déjà, veuillez choisir un autre mail.");
   }

   private validatePassword(password: string): void {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
      if (!regex.test(password)) {
         throw new ApolloError("Apollo Error : Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.");
         //   throw new PasswordValidationError("")
      }
   }

   private validateUsername(username: string): void {
      const regex = /^[a-zA-Z0-9-_]+$/;

      if (username.length < 5) {
         throw new ApolloError("Apollo Error : Le nom d'utilisateur doit contenir au moins 5 caractères");
      } else if (!regex.test(username)) {
         throw new ApolloError("Apollo Error : Le nom d'utilisateur ne peut contenir que des lettres, des chiffres et seuls les (-) et (_) sont acceptés.");
      }
   }
}
