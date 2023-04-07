import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase/FireApp";
import WideButton from "./WideButton";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const GoogleAuthButton = () => {
  const [user] = useAuthState(auth);
  let provider = null;

  const handleSignOutSignAndSignOut = () => {
    if (user) {
      handleSignOut();
    } else {
      handleSign();
    }
  };

  const handleSign = () => {
    provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div>
      <WideButton
        buttonLogoSrc="https://d1luwo5u9zpc4i.cloudfront.net/assets/google_signin-f3c9ed21a2b2cb641cd72c0c1ab811e3ad589cb0abfe0f4f37dce575492d29de.svg"
        buttonText={`Sign ${user ? "out from" : "in to"} Google`}
        handleClick={handleSignOutSignAndSignOut}
      ></WideButton>
    </div>
  );
};

export default GoogleAuthButton;
