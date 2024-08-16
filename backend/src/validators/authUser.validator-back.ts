import { ApolloError } from "apollo-server-errors";
import { User } from "entities";

export function validateEmail(email: string): void {
   const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
   if (!regex.test(email)) throw new ApolloError("Apollo Error : Veuillez saisir une adresse mail valide.");
}

export function validateExistingUser(existingUser: User | null): void {
   if (existingUser) throw new ApolloError("Ce mail existe déjà, veuillez choisir un autre mail.");
}

export function validatePassword(password: string): void {
   const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
   if (!regex.test(password)) {
      throw new ApolloError("Apollo Error : Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.");
   }
}

export function validateUsername(username: string): void {
   const regex = /^[a-zA-Z0-9-_]+$/;
   if (username.length < 5) {
      throw new ApolloError("Apollo Error : Le nom d'utilisateur doit contenir au moins 5 caractères");
   } else if (!regex.test(username)) {
      throw new ApolloError("Apollo Error : Le nom d'utilisateur ne peut contenir que des lettres, des chiffres et seuls les (-) et (_) sont acceptés.");
   }
}