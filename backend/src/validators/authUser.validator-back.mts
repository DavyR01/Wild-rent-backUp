import { ApolloError } from "apollo-server-errors";
import { User } from "entities/user.entity.mjs";

export function validateEmail(email: string): void {
   const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
   if (!regex.test(email)) throw new ApolloError("Apollo Error : invalid mail");
}

export function validateExistingUser(existingUser: User | null): void {
   if (existingUser) throw new ApolloError("Apollo Error : Existing user");
}

export function validatePassword(password: string): void {
   const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
   if (!regex.test(password)) {
      throw new ApolloError("Apollo Error : password rules");
   }
}

export function validateUsername(username: string): void {
   const regex = /^[a-zA-Z0-9-_]+$/;
   if (username.length < 5) {
      throw new ApolloError("Apollo Error : username length");
   } else if (!regex.test(username)) {
      throw new ApolloError("Apollo Error : username rules");
   }
}