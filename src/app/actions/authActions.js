import { AUTH } from '../reducers/authReducer';
import { validateInput } from '../../utils/validate';
import { isRegisteredUser } from '../../utils/isRegisteredUser';
import { generateToken } from '../../utils/generateToken';
import { fakeHashPassword } from '../../utils/hashPasword';

export const login = async (usersList, userData, dispatch) => {
  dispatch({ type: AUTH.REQUEST });

  if (!userData.email || !userData.password) {
    return dispatch({ type: AUTH.LOGIN_FAIL, payload: { head: 'Error', body: 'Please fill in all fields' } });
  }

  const userExists = await isRegisteredUser(usersList, userData.email);
  if (!userExists)
    return dispatch({ type: AUTH.LOGIN_FAIL, payload: { head: 'Error', body: 'This email is not exists' } });

  if (userExists) {
    if (userExists.password !== userData.password)
      return dispatch({ type: AUTH.LOGIN_FAIL, payload: { head: 'Error', body: 'Email / Password is not match' } });

    setTimeout(() => {
      dispatch({
        type: AUTH.LOGIN_SUCCESS,
        payload: { msg: { head: 'Success', body: 'Success Login' }, userInfo: userExists },
      });
      const token = generateToken(userExists.id);
      sessionStorage.setItem('loggedIn', JSON.stringify(token));
      localStorage.setItem('userInfo', JSON.stringify(userExists));
    }, 1500);
  } else {
    dispatch({ type: AUTH.LOGIN_FAIL, payload: { head: 'Error', body: 'User is not exists' } });
  }
};

export const logout = (dispatch) => {
  dispatch({ type: AUTH.REQUEST });

  dispatch({ type: AUTH.LOGOUT, payload: { head: 'Success', body: 'Success Logout' } });
  sessionStorage.removeItem('loggedIn');
  localStorage.removeItem('userInfo');
};

export const register = async (userData, usersList, dispatch) => {
  try {
    dispatch({ type: AUTH.REQUEST });

    const { errLength, errorMsg } = validateInput(userData);

    if (errLength > 0) {
      return dispatch({
        type: AUTH.REGISTER_FAIL,
        payload: { errorMsg, msg: { head: 'Error', body: 'Wrong credentials' } },
      });
    }

    const userExists = usersList.find((user) => user.email === userData.email);

    if (userExists) {
      dispatch({ type: AUTH.REGISTER_FAIL, payload: { head: 'Error', body: 'This email is already exists' } });
    } else {
      const user = {
        name: userData.name,
        email: userData.email,
        password: fakeHashPassword(20),
      };

      const addUser = await fetch('https://jsonplaceholder.typicode.com/users', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(user),
      });

      const data = await addUser.json();

      dispatch({
        type: AUTH.REGISTER_SUCCESS,
        payload: { msg: { head: 'Success', body: 'Success Register' }, user: data },
      });
    }
  } catch (err) {
    console.log(err);
  }
};
