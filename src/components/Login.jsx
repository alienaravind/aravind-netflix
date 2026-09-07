import { useRef, useState } from "react";
import { NETFLIX_BG, NETFLIX_LOGO } from "../utils/constants";
import { checkValidData } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/authentication";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import useAuthentication from "./hooks/useAuthentication";

const Login = () => {
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [signInForm, setSignInForm] = useState(true);
  const [errMessage, setErrorMessage] = useState(null);

  useAuthentication();

  const handleOnClick = () => {
    const flag = checkValidData(email.current.value, password.current.value);
    setErrorMessage(flag);
    if (!signInForm && flag === null) {
      //CREATE USER WITH EMAIL AND PASSWORD
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              // Profile updated!
              const { uid, displayName, email } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  displayName: displayName,
                  email: email,
                }),
              );
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode + " " + errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      //SIGN IN USER WITH EMAIL AND PASSWORD
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };

  const handleFormToggle = () => {
    setSignInForm(!signInForm);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img
          className="w-full h-full object-cover"
          src={NETFLIX_BG}
          alt="Netflix background"
        />

        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Netflix Logo */}
      <div className="absolute top-5 left-25 md:top-0 md:left-0 w-full">
        <img
          className="
          w-52
          sm:w-40
          md:w-48
          mt-6
          ml-6
          md:mt-5
          md:ml-10
        "
          src={NETFLIX_LOGO}
          alt="Netflix"
        />
      </div>

      {/* Login Form */}
      <form
        className="
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2
        -translate-y-1/2

        w-[calc(100%-32px)]
        max-w-md

        p-6
        sm:p-8
        md:p-10

        rounded-lg
        bg-black/75
        text-white
      "
        onSubmit={(e) => e.preventDefault()}
      >
        <h1
          className="
        text-lg
        sm:text-xl
        md:text-2xl
        mb-5
        font-bold
        text-center
      "
        >
          Welcome to Aravind's Netflix
        </h1>

        <h1
          className="
        text-3xl
        sm:text-4xl
        mb-4
        font-bold
      "
        >
          {signInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!signInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="
            w-full
            p-3
            mb-3
            bg-transparent
            border
            border-gray-500
            rounded-md
            outline-none
            focus:ring-1
            focus:ring-white
          "
          />
        )}

        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="
          w-full
          p-3
          mb-3
          bg-transparent
          border
          border-gray-500
          rounded-md
          outline-none
          focus:ring-1
          focus:ring-white
        "
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="
          w-full
          p-3
          mb-3
          bg-transparent
          border
          border-gray-500
          rounded-md
          outline-none
          focus:ring-1
          focus:ring-white
        "
        />

        {errMessage && (
          <p
            className="
          mb-4
          text-sm
          sm:text-base
          text-red-500
          font-bold
        "
          >
            {errMessage}
          </p>
        )}

        <button
          onClick={handleOnClick}
          type="submit"
          className="
          w-full
          p-3
          mt-2
          bg-red-600
          rounded-md
          font-bold
          hover:bg-red-700
          cursor-pointer
        "
        >
          {signInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="
        mt-5
        text-sm
        sm:text-base
        text-white
      "
        >
          {signInForm ? "New to Netflix?" : "Existing User?"}{" "}
          <span
            onClick={handleFormToggle}
            className="
            font-bold
            hover:underline
            cursor-pointer
          "
          >
            {signInForm ? "Sign up now." : "Sign in now."}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
