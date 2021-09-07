// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export function UserLogin(email) {
  return ({
    type: LOGIN,
    user: {
      email,
    },
  });
}
