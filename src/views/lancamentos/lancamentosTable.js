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
            className="btn btn-success"
            disabled={lancamento.status !== 'PENDENTE'}
            title="Efetivar"
            onClick={() => props.alterarStatusAction(lancamento, 'EFETIVADO')}
          >
            <i className="pi pi-check" />
          </button>

          <button
            type="button"
            className="btn btn-warning"
            disabled={lancamento.status !== 'PENDENTE'}
            title="Cancelar"
            onClick={() => props.alterarStatusAction(lancamento, 'CANCELADO')}
          >
            <i className="pi pi-times" />
          </button>

          <button
            type="button"
            className="btn btn-primary"
            title="Editar"
            onClick={() => props.editeAction(lancamento.id)}
          >
            <i className="pi pi-pencil" />
          </button>

          <button
            type="button"
            className="btn btn-danger"
            title="Excluir"
            onClick={() => props.deleteAction(lancamento)}
          >
            <i className="pi pi-trash" />
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
