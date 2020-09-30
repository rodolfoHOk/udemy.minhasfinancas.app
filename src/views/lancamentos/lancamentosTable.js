/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import currencyFormatter from 'currency-formatter';

export default (props) => {
  const { lancamentos } = props;
  // eslint-disable-next-line arrow-body-style
  const rows = lancamentos.map((lancamento) => {
    return (
      <tr key={lancamento.id}>
        <td>{lancamento.descricao}</td>
        <td>{currencyFormatter.format(lancamento.valor, { locale: 'pt-BR' })}</td>
        <td>{lancamento.tipo}</td>
        <td>{lancamento.mes}</td>
        <td>{lancamento.status}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => props.editeAction(lancamento.id)}
          >
            Editar
          </button>
          <span> </span>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => props.deleteAction(lancamento)}
          >
            Deletar
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Valor</th>
          <th scope="col">Tipo</th>
          <th scope="col">Mês</th>
          <th scope="col">Situação</th>
          <th scope="col">Ações</th>
        </tr>

      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};
