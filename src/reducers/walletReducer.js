// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  buttonText: 'Adicionar despesa',
};

const ACTION = {
  type: 'ADD_EXPENSE',
  wallet: {},
};

function walletReducer(state = INITIAL_STATE, action = ACTION) {
  const { type, wallet } = action;
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
  case EDIT_EXPENSE:
    return {
      ...state,
      buttonText: wallet.buttonText,
      idToEdit: wallet.idToEdit,
    };
  default:
    return state;
  }
}

export default walletReducer;
