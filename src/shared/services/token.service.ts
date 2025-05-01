"use client";
import Cookies from "js-cookie";

const getAccessToken = () => {
  return Cookies.get("accessToken");
};

const getRefreshToken = () => {
  return Cookies.get("refreshToken");
};

const saveAccessToken = (accessToken: string) => {
  Cookies.set("accessToken", accessToken);
};

const removeAccessToken = () => Cookies.remove("accessToken");

export const tokenService = {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  removeAccessToken,
};
