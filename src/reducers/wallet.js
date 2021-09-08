// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const ADD_EXPENSE = 'ADD_EXPENSE';

function walletReducer(state = INITIAL_STATE, action) {
  const { type, wallet } = action;
  switch (type) {
  case ADD_EXPENSE:
    return {
      ...state,
      currencies: wallet.currencies,
      expenses: wallet.expenses,
    };
  default:
    return state;
  }
}

export default walletReducer;
