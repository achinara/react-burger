const API = 'https://norma.nomoreparties.space/api';
const API_AUTH = `${API}/auth`;

const API_FETCH_INGREDIENTS = `${API}/ingredients`;
const API_ORDER = `${API}/orders`;

const API_USER_FETCH = `${API_AUTH}/user`;
const API_REGISTER_USER = `${API_AUTH}/register`;
const API_LOGIN = `${API_AUTH}/login`;
const API_LOGOUT = `${API_AUTH}/logout`;
const API_REFRESH_TOKEN = `${API_AUTH}/token`;
const API_FORGOT_PASS = `${API}/password-reset`;
const API_RESET_PASS = `${API_FORGOT_PASS}/reset`;

const WS_API_ORDER_LIST = 'wss://norma.nomoreparties.space/orders/all';

export {
  API_FETCH_INGREDIENTS,
  API_ORDER,
  API_REGISTER_USER,
  API_LOGIN,
  API_LOGOUT,
  API_REFRESH_TOKEN,
  API_FORGOT_PASS,
  API_RESET_PASS,
  API_USER_FETCH,
  WS_API_ORDER_LIST,
};
