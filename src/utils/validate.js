function validateEmail(email) {
  const re = /[a-z0-9!#$%&'*+/=?^`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(email);
}

export const validateInput = (data) => {
  const {name, email, password, cf_password}  = data;

  const err = {};

  if (!name) {
    err.name = 'Please add your name';
  } else if (name.length > 25) {
    err.name = 'Name must be under 25 characters';
  }

  if (!email) {
    err.email = 'Please add your email';
  } else if (!validateEmail(email)) {
    err.email = 'Email is not valid';
  }

  if (!password) {
    err.password = 'Please add your password';
  } else if (password.length < 6) {
    err.password = 'Password must be at least 6 characters';
  }

  if (!cf_password) {
    err.cf_password = 'Please add your confirm password';
  } else if (password !== cf_password) {
    err.cf_password = "Passwords doesn't match";
  }


  return { errorMsg: err, errLength: Object.keys(err).length };
};
