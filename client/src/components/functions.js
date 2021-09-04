import React, { useState } from "react";

// gets hash parameters
export function getHashParams() {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  e = r.exec(q);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }

  return hashParams;
}

export function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// Retrieve object stored in localStorage

export const getObject = (key) => {
  const value = window.sessionStorage.getItem(key);
  if (value === null || value === "undefined") return null;
  return JSON.parse(value);
};

// Store object as string in storage
export const setObject = (key, value) =>
  window.sessionStorage.setItem(key, JSON.stringify(value));

export const LogoutButton = () => {
  window.localStorage.clear();
  window.location.replace("/");
  const [loggedOut, setLoggedOut] = useState(false);

  const logout = () => {
    localStorage.removeItem("whpf_user");
    setLoggedOut(true);
  };

  if (loggedOut) {
    return <Redirect to="/" push={true} />;
  }

  return <Button onClick={logout}>LogOut</Button>;
};
