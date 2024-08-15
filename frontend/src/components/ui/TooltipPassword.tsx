import { useEffect, useState } from "react";

// interface TooltipPasswordProps {
//    password: string;
// }

const TooltipPassword = ({ password }: { password: string }) => {

   const isMinLength = (password: string) => password.length >= 8;
   const hasUppercase = (password: string) => /[A-Z]/.test(password);
   const hasLowercase = (password: string) => /[a-z]/.test(password);
   const hasNumber = (password: string) => /[0-9]/.test(password);
   const hasSpecialChar = (password: string) => /[^A-Za-z0-9]/.test(password);

   const [validations, setValidations] = useState({
      minLength: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
   });

   useEffect(() => {
      setValidations({
         minLength: isMinLength(password),
         uppercase: hasUppercase(password),
         lowercase: hasLowercase(password),
         number: hasNumber(password),
         specialChar: hasSpecialChar(password),
      });
   }, [password]);

   return (
      <div className="absolute bg-center z-10 w-96 rounded-md bg-gray-200 text-black  shadow-lg ring-1 ring-black ring-opacity-40 bottom-8 right-0 border-black">
         <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
         >
            <p className="block px-4 py-2 text-sm text-black"
            ><b>Le mot de passe doit contenir :</b></p>
            <ul className="block px-4 py-2 text-sm list-disc pl-12">
               <li className={validations.minLength ? 'text-green-600' : 'text-red-800'}>
                  au moins <b>8 caractères</b>
               </li>
               <li className={validations.uppercase ? 'text-green-600' : 'text-red-800'}>
                  au moins <b>une lettre majuscule</b>
               </li>
               <li className={validations.lowercase ? 'text-green-600' : 'text-red-800'}>
                  au moins <b>une lettre minuscule</b>
               </li>
               <li className={validations.number ? 'text-green-600' : 'text-red-800'}>
                  au moins <b>un chiffre</b>
               </li>
               <li className={validations.specialChar ? 'text-green-600' : 'text-red-800'}>
                  et au moins <b>un caractère spécial</b>
               </li>
            </ul>
         </div>
      </div>
   )
}

export default TooltipPassword
