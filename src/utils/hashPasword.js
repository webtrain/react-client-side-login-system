// import bcrypt from 'bcrypt';

export const fakeHashPassword = (length) => {
  let password = '';
  const passwordLength = length;

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@{};>*-_[]><#&';

  for (let i = 0; i < passwordLength; i++) {
    const random = Math.floor(Math.random() * characters.length);
    password += characters.charAt(random);
  }

  return password;
};
