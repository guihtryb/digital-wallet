import React, { Component } from 'react';

export default class TableHeader extends Component {
  render() {
    const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Excluir'];

    return (
      <tr>
        { tableHeaders.map((header) => (
          <th key={ header }>
            { header }
          </th>)) }
      </tr>
    );
  }
}
