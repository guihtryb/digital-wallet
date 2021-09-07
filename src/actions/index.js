// Coloque aqui suas actions

const LOGIN = (email) => ({
  type: 'LOGIN',
  user: {
    email,
  },
});

export default LOGIN;
