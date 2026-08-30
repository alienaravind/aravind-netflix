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
    <div>
      <div className="absolute">
        <img src={NETFLIX_BG} />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="flex justify-between w-screen bg-black h-30">
        <img className="absolute left-30 top-7 lg:w-50" src={NETFLIX_LOGO} />
      </div>
      <form
        className={`w-4/12 ${
          signInForm ? "h-105" : "h-120 my-[120]"
        } rounded-lg absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white opacity-70`}
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-2xl mx-1 mb-5 font-bold text-center">
          Welcome to Aravind's Netflix
        </h1>
        <h1 className="text-4xl mx-1 mb-2 font-bold">
          {signInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!signInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className=" w-full p-2 m-2 mx-1 border mb-3 border-gray-500 rounded-md hover:ring-1 ring-white"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className=" w-full p-2 m-2 mx-1 border mb-3 border-gray-500 rounded-md hover:ring-1 ring-white"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className=" w-full p-2 m-2 mx-1 border mb-3 border-gray-500 rounded-md hover:ring-1 ring-white"
        />
        {<p className="mb-4 text-red-600 font-bold text-1xl">{errMessage}</p>}
        <button
          onClick={handleOnClick}
          type="submit"
          className="mx-1 bg-red-600 text-bold rounded-lg w-full p-2 hover:bg-red-700 cursor-pointer"
        >
          {signInForm ? "Sign In" : "Sign Up"}
        </button>
        <h1 className=" mx-1 my-4 text-white">
          {signInForm ? "New to Netflix?" : "Existing User?"}{" "}
          <span
            onClick={handleFormToggle}
            className="font-bold hover:underline cursor-pointer"
          >
            {signInForm ? "Sign up now." : "Sign in now."}
          </span>
        </h1>
      </form>
    </div>
  );
};

export default Login;
