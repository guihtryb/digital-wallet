// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  despesas: 0,
};

function walletReducer(state = INITIAL_STATE, action) {
  const { type, wallet/* despesas */ } = action;
  switch (type) {
  case ADD_EXPENSE:
    return {
      ...state,
      currencies: wallet.currencies,
      despesas: wallet.despesas,
      expenses: [...state.expenses, wallet.expenses],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      currencies: wallet.currencies,
      despesas: wallet.despesas,
      expenses: wallet.expenses,
    };
  default:
    return state;
  }
}

export default walletReducer;
