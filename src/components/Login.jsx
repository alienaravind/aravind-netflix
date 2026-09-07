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
    const flag = checkValidData(
      email.current.value,
      password.current.value
    );

    setErrorMessage(flag);

    if (!signInForm && flag === null) {
      // CREATE USER
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, displayName, email } = auth.currentUser;

              dispatch(
                addUser({
                  uid: uid,
                  displayName: displayName,
                  email: email,
                })
              );
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;

              setErrorMessage(
                errorCode + " " + errorMessage
              );
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setErrorMessage(
            errorCode + " " + errorMessage
          );
        });
    } else {
      // SIGN IN USER
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setErrorMessage(
            errorCode + " " + errorMessage
          );
        });
    }
  };

  const handleFormToggle = () => {
    setSignInForm(!signInForm);
  };

  return (
    <div className="relative min-h-screen w-full">

      {/* ================= BACKGROUND ================= */}

      <div className="fixed inset-0 -z-10">
        <img
          className="h-full w-full object-cover"
          src={NETFLIX_BG}
          alt="Netflix background"
        />

        <div className="absolute inset-0 bg-black/50"></div>
      </div>


      {/* ================= NETFLIX LOGO ================= */}

      <div
        className="
          absolute
          top-5
          left-5
          sm:left-8
          md:left-10
          z-10
        "
      >
        <img
          className="
            w-36
            sm:w-40
            md:w-48
          "
          src={NETFLIX_LOGO}
          alt="Netflix"
        />
      </div>


      {/* ================= FORM CONTAINER ================= */}

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          px-4
          py-24
        "
      >

        {/* ================= LOGIN FORM ================= */}

        <form
          onSubmit={(e) => e.preventDefault()}
          className="
            w-full
            max-w-md
            p-6
            sm:p-8
            md:p-10
            rounded-lg
            bg-black/75
            text-white
          "
        >

          {/* Welcome */}

          <h1
            className="
              mb-5
              text-center
              text-lg
              sm:text-xl
              md:text-2xl
              font-bold
            "
          >
            Welcome to Aravind's Netflix
          </h1>


          {/* Sign In / Sign Up */}

          <h2
            className="
              mb-4
              text-3xl
              sm:text-4xl
              font-bold
            "
          >
            {signInForm ? "Sign In" : "Sign Up"}
          </h2>


          {/* Name */}

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


          {/* Email */}

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


          {/* Password */}

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


          {/* Error */}

          {errMessage && (
            <p
              className="
                mb-4
                text-sm
                sm:text-base
                font-bold
                text-red-500
              "
            >
              {errMessage}
            </p>
          )}


          {/* Submit */}

          <button
            onClick={handleOnClick}
            type="submit"
            className="
              w-full
              p-3
              mt-2
              rounded-md
              bg-red-600
              font-bold
              hover:bg-red-700
              cursor-pointer
            "
          >
            {signInForm ? "Sign In" : "Sign Up"}
          </button>


          {/* Toggle */}

          <p
            className="
              mt-5
              text-sm
              sm:text-base
              text-white
            "
          >
            {signInForm
              ? "New to Netflix?"
              : "Existing User?"}{" "}

            <span
              onClick={handleFormToggle}
              className="
                font-bold
                hover:underline
                cursor-pointer
              "
            >
              {signInForm
                ? "Sign up now."
                : "Sign in now."}
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;