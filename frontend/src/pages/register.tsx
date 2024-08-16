import { ApolloError, useMutation } from "@apollo/client";
import ErrorsValidations from "components/ui/ErrorsValidations";
import TooltipPassword from "components/ui/TooltipPassword";
import { UserContext } from "contexts/UserContext";
import { CREATE_USER } from "lib/graphql/mutations";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiInfo } from "react-icons/fi";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { inputRegisterUser } from "types/inputRegisterUser";
import { validateConfirmPassword, validateEmail, validatePassword, validateUsername } from "validators/authUser.validator-front";

const RegisterPage = () => {
   const router = useRouter();
   const [showPassword, setShowPassword] = useState(false);
   const [globalError, setglobalError] = useState("");
   const [emailError, setEmailError] = useState("");
   const [formSubmitted, setFormSubmitted] = useState(false);
   const [showToolTipPassword, setShowToolTipPassword] = useState(false);
   const authInfo = useContext(UserContext);
   const errorHandlers: { [key: string]: () => void } = {
      "Apollo Error : Existing user": () => setEmailError("Ce mail existe déjà, veuillez choisir un autre mail."),
      "Apollo Error : invalid mail": () => setglobalError("Veuillez saisir une adresse mail valide."),
      "Apollo Error : password rules": () => setglobalError("Le mot de passe est trop faible, veuillez choisir un mot de passe plus long et complexe."),
      "Apollo Error : username length": () => setglobalError("Le nom d'utilisateur doit contenir au moins 5 caractères")
   };


   if (authInfo.isLoggedIn) {
      router.push("/");
   }

   const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm<inputRegisterUser>(
      // { mode: "onChange" }
   );
   const [createUser, { loading, error: mutationError }] = useMutation(CREATE_USER);

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   const onSubmit: SubmitHandler<inputRegisterUser> = async (data) => {
      setFormSubmitted(true)
      setglobalError("")
      setEmailError("")

      try {
         await createUser({
            variables: {
               newUserData: {
                  username: data.username,
                  email: data.email,
                  password: data.password,
               },
            },
         });

         localStorage.setItem("registrationSuccess", "true");
         router.push("/login");
      } catch (err: any) {
         const apolloError = err as ApolloError;
         const errorMessage = apolloError.message;
         const handler = Object.keys(errorHandlers).find((key) =>
            errorMessage.includes(key)
         );

         if (handler) {
            errorHandlers[handler]();
         } else {
            setglobalError("Une erreur s'est produite lors de la création de l'utilisateur");
         }
         console.error("Catch Error : " + err);
      }
   };
   const eyeIcon = showPassword ? <HiEyeOff /> : <HiEye />;

   const handleShowToolTipPassword = () => {
      setShowToolTipPassword(!showToolTipPassword)
   }

   const handlePasswordFocus = (e: ChangeEvent<HTMLInputElement>) => {
      setShowToolTipPassword(true)
   }

   const emailInputClass = `focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border ${emailError ? 'border-red-400 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
      } bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`;

   return (
      <div className="flex justify-center">
         <div className="w-full rounded-lg bg-white shadow md:max-w-lg xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
               <div className="mb-6 flex items-center">
                  <Link
                     href="./"
                     className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
                  >
                     <Image
                        src="/wildrent-logo.png"
                        alt="test"
                        width={50}
                        height={50}
                     />
                  </Link>
                  <h1 className="ml-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                     Créer un compte
                  </h1>
               </div>


               <form
                  className="space-y-3 md:space-y-3"
                  onSubmit={handleSubmit(onSubmit)}
               >
                  {/* Nom dutilisateur */}
                  <div>
                     <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Nom d&apos;utilisateur
                     </label>
                     <input
                        id="username"
                        type="text"
                        {...register("username", {
                           validate: validateUsername,
                        })}
                        className={`focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 
                           ${errors.username ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-primary-600 focus:border-black dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500'}`}
                        placeholder="Votre nom d'utilisateur"
                     />
                     {errors.username && <ErrorsValidations message={errors.username.message!} />}
                  </div>

                  {/* E-mail */}
                  <div>
                     <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        E-mail
                     </label>
                     <input
                        id="email"
                        type="email"
                        {...register("email", {
                           validate: validateEmail
                        })}
                        className={`
                           ${emailInputClass}
                           ${errors.email ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300 focus:ring-primary-600 focus:border-black dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500'}`}
                        placeholder="name@domain.com"
                     />
                     {errors.email && <ErrorsValidations message={errors.email.message} />}
                     {emailError && <ErrorsValidations message={emailError} />}
                  </div>

                  {/* Mot de passe  */}
                  <div tabIndex={0} onBlur={() => setShowToolTipPassword(false)}>
                     <div className="flex flex-row relative" >
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                           Mot de passe
                        </label>

                        <div
                           onClick={handleShowToolTipPassword}
                        >
                           <FiInfo className="size-5 text-black ml-1" />
                        </div>

                        {showToolTipPassword && <TooltipPassword password={watch('password')} />}
                     </div>
                     <div className="relative">
                        <input
                           id="password"
                           type={showPassword ? "text" : "password"}
                           {...register("password", {
                              validate: validatePassword
                           })}
                           placeholder="••••••••"
                           className={`focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500  
                              
                              ${errors.password || errors.confirmPassword ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
                                 : 'border-gray-300 focus:ring-primary-600 focus:border-black dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500'}`}
                           onFocus={(e) => handlePasswordFocus(e)}
                           onBlur={() => setShowToolTipPassword(false)}
                        />
                        <button
                           type="button"
                           className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                           onClick={togglePasswordVisibility}
                        >
                           {eyeIcon}
                        </button>
                     </div>
                     {errors.password && <ErrorsValidations message={errors.password.message} />}
                  </div>

                  {/* Confirmer le mot de passe */}
                  <div>
                     <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                        Confirmez le mot de passe
                     </label>
                     <div className="relative">
                        <input
                           id="confirmPassword"
                           type={showPassword ? "text" : "password"}
                           {...register("confirmPassword", {
                              validate: (value) => validateConfirmPassword(value, getValues)
                           })}
                           placeholder="••••••••"
                           className={`focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 
                              
                              ${errors.confirmPassword ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
                                 : 'border-gray-300 focus:ring-primary-600 focus:border-black dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500'}`}

                        />
                     </div>

                     {/* Gestion erreurs Mot de passe */
                     /* Non confirmé */}
                     {errors.confirmPassword && <ErrorsValidations message={errors.confirmPassword.message!} />}

                     {/* Non identique */}
                     {/* {errorSamePassword && <ErrorsValidations message={errorSamePassword} />} */}
                  </div>

                  {/* Gestion erreurs globales formulaire */}
                  {globalError && <ErrorsValidations message={globalError} />}

                  {/* {mutationError && <ErrorsValidations message={mutationError.message} />} */}

                  {/* Bouton s'enregistrer */}
                  <button
                     type="submit"
                     className="w-full rounded-lg bg-indigo-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                     disabled={loading}
                  >
                     S&apos;enregistrer
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                     Vous avez déjà un compte ?{" "}
                     <Link
                        href="/login"
                        className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                     >
                        Se connecter
                     </Link>
                  </p>
               </form>
            </div>
         </div>
      </div>
   );
};

export default RegisterPage;
