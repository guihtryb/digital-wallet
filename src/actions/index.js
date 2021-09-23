// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export function UserLogin(email) {
  return ({
    type: LOGIN,
    user: {
      email,
    },
  });
}

export function walletExpenses(expenses, despesas) {
  return ({
    type: ADD_EXPENSE,
    wallet: {
      expenses,
      despesas,
    },
  });
}

// stackOverflow https://stackoverflow.com/questions/37777525/delete-an-item-from-redux-state/37777800
export function deleteExpenseAction(expenses, despesas) {
  return ({
    type: DELETE_EXPENSE,
    wallet: {
      expenses,
      despesas,
    },
  });
}
