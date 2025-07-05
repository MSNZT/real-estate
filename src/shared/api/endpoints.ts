const AUTH_BASE = "/auth";
const OAUTH_BASE = "/oauth";
const BOOKING_BASE = "/bookings";
const LOCATION_BASE = "/location";

export const AUTH_ENDPOINTS = {
  login: `${AUTH_BASE}/login`,
  register: `${AUTH_BASE}/register`,
  logout: `${AUTH_BASE}/logout`,
  refresh: `${AUTH_BASE}/refresh`,
  forgetPassword: `${AUTH_BASE}/forget-password`,
  forgetPasswordValidate: `${AUTH_BASE}/forget-password/validate`,
  resetPassword: `${AUTH_BASE}/reset-password`,
  me: `${AUTH_BASE}/me`,
};

export const OAUTH_ENDPOINTS = {
  register: `${OAUTH_BASE}/register`,
  validate: `${OAUTH_BASE}/validate`,
  loginGoogle: `${OAUTH_BASE}/google`,
  loginYandex: `${OAUTH_BASE}/yandex`,
};

export const BOOKING_ENDPOINTS = {
  calculatePrice: `${BOOKING_BASE}/calculate`,
};

export const LOCATION_ENDPOINTS = {
  addressByQuery: `${LOCATION_BASE}/address-by-query`,
  settlementByQuery: `${LOCATION_BASE}/settlement-by-query`,
  addressByCoords: `${LOCATION_BASE}/address-by-coords`,
};
