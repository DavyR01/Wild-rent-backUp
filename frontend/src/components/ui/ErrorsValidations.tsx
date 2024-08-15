
const ErrorsValidations = ({message}: any) => {
   return (
      <div
         className="relative mt-2 py-1 px-2 rounded border text-red-700 border-red-400 bg-red-100 "
         role="alert"
      >
         <strong className="font-bold">Erreur: </strong>
         <span className="block sm:inline">
            {message}
         </span>
      </div>
   )
}

export default ErrorsValidations


// className="relative mt-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
