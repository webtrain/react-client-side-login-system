export const AUTH = {
  REQUEST: 'REQUEST',
  LOGIN_FAIL: 'LOGIN_FAIL',
  REGISTER_FAIL: 'REGISTER_FAIL',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  LOGOUT: 'LOGOUT',
  RESET: 'RESET',
};

const userFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};

export const initialState = {
  // loading: false,
  // success: false,
  // error: false,
  // msg: null,
  // alert: {},
  userInfo: userFromStorage,
  // registeredUser:{}
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case AUTH.REQUEST:
      return { ...state, loading: true };
    case AUTH.LOGIN_FAIL:
      return { ...state, loading: false, error: true, msg: { head: payload.head, body: payload.body } };
    case AUTH.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        msg: { head: payload.msg.head, body: payload.msg.body },
        alert: payload.errorMsg,
      };
    case AUTH.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        msg: { head: payload.msg.head, body: payload.msg.body },
        registeredUser: payload.user,
      };
    case AUTH.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        msg: { head: payload.msg.head, body: payload.msg.body },
        userInfo: payload.userInfo,
      };

    case AUTH.LOGOUT:
      return {
        ...state,
        loading: false,
        success: true,
        registeredUser: {},
        userInfo: {},
        msg: { head: payload.head, body: payload.body },
      };
    case AUTH.RESET:
      return { ...state, loading: false, error: false, msg: null, success: false };
    default:
      return state;
  }
};

export default authReducer;
