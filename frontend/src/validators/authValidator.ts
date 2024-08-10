
export const validateUsername = (username: string): string | undefined => {
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

   if (!regex.test(email)) {
      return "Veuillez saisir une adresse e-mail valide";
   }

   if (!email) {
      return "Le mail est requis";
   }

}

