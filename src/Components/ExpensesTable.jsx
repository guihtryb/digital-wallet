import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableCell from './TableCell';
import TableHeader from './TableHeader';

class ExpensesTable extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table className="expenses-table">
        <TableHeader />
        { expenses.map((expense) => (
          <TableCell
            expense={ expense }
            key={ expense.id }
          />))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesTable);

ExpensesTable.propTypes = {
  expenses: PropTypes.string.isRequired,
};
