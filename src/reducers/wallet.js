// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  const { type, wallet/* despesas */ } = action;
  switch (type) {
  case ADD_EXPENSE:
    return {
      ...state,
      currencies: wallet.currencies,
      expenses: [...state.expenses, wallet.expenses],
    };
  case DELETE_EXPENSE:
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
