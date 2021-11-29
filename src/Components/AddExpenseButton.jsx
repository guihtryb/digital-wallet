import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AddExpenseButton extends Component {
  render() {
    const { addExpense, buttonText } = this.props;
    return (
      <button className="add-button" type="submit" onClick={ addExpense }>
        { buttonText }
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  buttonText: state.wallet.buttonText,
});

export default connect(mapStateToProps)(AddExpenseButton);

AddExpenseButton.propTypes = {
  addExpense: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};
