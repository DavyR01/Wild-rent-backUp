
const TooltipPassword = () => {
   return (
      <div className="absolute bg-center z-10 w-96 rounded-md bg-gray-200 text-black  shadow-lg ring-1 ring-black ring-opacity-40 bottom-8 right-0 border-black">
         <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
         >
            <div
               className="block px-4 py-2 text-sm text-white-700"
               role="menuitem"
            >
               <p>Should contain at least a capital letter</p>
               <p>Should contain at least a small letter</p>
               <p>Should contain at least a number</p>
               <p>Should contain at least a special character</p>
               <p>And minimum length</p>
            </div>
         </div>
      </div>
   )
}

export default TooltipPassword
