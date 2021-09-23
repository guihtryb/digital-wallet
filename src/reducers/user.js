// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  const { type, user } = action;
  switch (type) {
  case LOGIN:
    return {
      ...state,
      email: user.email,
    };

  default:
    return state;
  }
}

export default userReducer;
