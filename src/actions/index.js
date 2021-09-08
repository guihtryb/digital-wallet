// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
const ADD_EXPENSE = 'ADD_EXPENSE';

export function UserLogin(email) {
  return ({
    type: LOGIN,
    user: {
      email,
    },
  });
}

export function walletExpenses(expenses) {
  return ({
    type: ADD_EXPENSE,
    wallet: {
      expenses: [expenses],
    },
  });
}
