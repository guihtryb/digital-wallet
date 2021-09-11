// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const ADD_EXPENSE = 'ADD_EXPENSE';

function walletReducer(state = INITIAL_STATE, action) {
  const { type, wallet, despesas } = action;
  switch (type) {
  case ADD_EXPENSE:
    return {
      ...state,
      currencies: wallet.currencies,
      expenses: [...state.expenses, wallet.expenses],
      despesas,
    };
  default:
    return state;
  }
}

export default walletReducer;
