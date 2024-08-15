
const TooltipPassword = () => {
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
            <ul
               className="block px-4 py-2 text-sm list-disc pl-12 text-red-800"
            >
               <li>au moins <b>8 caractères</b></li>
               <li>au moins <b>une lettre majuscule</b></li>
               <li>au moins <b>une lettre minuscule</b></li>
               <li>au moins <b>un chiffre</b> </li>
               <li>et au moins <b>un caractère spécial</b></li>
            </ul>
         </div>
      </div>
   )
}

export default TooltipPassword
