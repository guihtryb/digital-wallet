// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const ACTION = {
  type: 'LOGIN',
  user: {
    email: 'user@email.com',
  },
};

function userReducer(state = INITIAL_STATE, action = ACTION) {
  const { type, user } = action;
  if (type === LOGIN) {
    return {
      ...state,
      email: user.email,
    };
  }
  return state;
}

export default userReducer;
