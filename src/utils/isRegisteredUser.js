export const isRegisteredUser = (usersArray, email) => {
  const user = usersArray.find((user) => user.email === email);
  return user;
};
