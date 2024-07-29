import React from "react";
import { useState, useRef } from "react";

import { auth } from "../config/firebase";
import { getAuth, updateProfile } from "firebase/auth";
import { signOut } from "firebase/auth";

const NavbarProfile = () => {
  const [isChangingProfile, setIsChangingProfile] = useState(false);
  const usernameRef = useRef();
  const imageRef = useRef();

  const handleSignOut = () => {
    try {
      signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  function handleSave() {
    if (
      usernameRef.current.value.trim() !== "" &&
      usernameRef.current.value.length < 18 &&
      imageRef.current.value.trim() !== ""
    ){
        updateProfile(auth.currentUser, {
            displayName: usernameRef.current.value,
            photoURL: imageRef.current.value
          }).then(() => {
            setIsChangingProfile(false);
          })
    }
      
  }

  if (isChangingProfile) {
    return (
      <form className="change_profile">
        <p>
          <label htmlFor="image">Image URL:</label>
          <input type="url" name="image" id="image" ref={imageRef} />
        </p>
        <p>
          <label htmlFor="userName">Username:</label>
          <input type="text" name="userName" id="userName" ref={usernameRef} />
        </p>
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button onClick={() => setIsChangingProfile(false)}>
            Cancel
        </button>
      </form>
    );
  }

  return (
    <>
      <div className="profile">
        <div className="profile-img">
          <img
            src={
              auth.currentUser.photoURL ??
              "https://img.freepik.com/free-icon/user_318-159711.jpg"
            }
            alt=""
          />
        </div>
        <div className="profile-infos">
          <p>Hello there</p>
          <h3>
            {auth.currentUser.displayName ?? "Uknown "}
            <button onClick={() => setIsChangingProfile(true)}>
              <i className="bx bxs-edit"></i>
            </button>
          </h3>
        </div>
      </div>
      <div className="logout_container">
        <button onClick={handleSignOut}>
          <i className="bx bx-log-out"></i>
          Logout
        </button>
      </div>
    </>
  );
};

export default NavbarProfile;
