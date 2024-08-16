// import { User } from "types/user";

export const validateUsername = (username: string): string | undefined => {
   if (!username) {
      return "Le nom d'utilisateur est requis";
   }

   if (username.length < 5) {
      return "Le nom d'utilisateur doit contenir au moins 5 caractères";
   }

   const regex = /^[a-zA-Z0-9-_]+$/;
   if (!regex.test(username)) {
      return "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres et seuls les (-) et (_) sont acceptés.";
   }
}


export const validateEmail = (email: string): string | undefined => {
   const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

   if (!email) {
      return "Le mail est requis";
   }

   if (!regex.test(email)) {
      return "Veuillez saisir une adresse e-mail valide";
   }
}


export const validatePassword = (password: string): string | undefined => {
   const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/

   if (!password) {
      return "Le mot de passe est requis";
   }

   if (!regex.test(password)) {
      return "Le mot de passe doit contenir au moins 8 caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.";
   }
}


export const validateConfirmPassword = (confirmPassword: string, getValues: any): string | undefined => {
   // const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/
   const password = getValues('password')

   if (!confirmPassword) {
      return "La confirmation de mot de passe est requise";
   }
   if (confirmPassword !== password) {
      return "Les mots de passe ne correspondent pas !";
   }
}


// export function validateExistingUser(existingUser: User | null): string | undefined {
//    if (existingUser) {
//       return "Ce mail existe déjà, veuillez choisir un autre mail.";
//    }
//    return undefined;
// }