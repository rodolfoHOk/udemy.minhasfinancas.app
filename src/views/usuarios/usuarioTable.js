import React from 'react';

export default (props) => {
  // eslint-disable-next-line react/prop-types
  const { usuarios } = props;

  // eslint-disable-next-line react/prop-types, arrow-body-style
  const rows = usuarios.map((usuario) => {
    const listaAutoridades = [];

    for (let index = 0; index < usuario.autoridades.length; index += 1) {
      listaAutoridades[index] = usuario.autoridades[index].nome;
    }

    return (
      <tr key={usuario.id}>
        <td>{usuario.nome}</td>
        <td>{usuario.nomeUsuario}</td>
        <td>{usuario.email}</td>
        <td>{listaAutoridades.join(', ')}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary"
            title="Editar"
            // eslint-disable-next-line react/prop-types
            onClick={() => props.editeAction(usuario.id)}
          >
            <i className="pi pi-pencil" />
          </button>

          <button
            type="button"
            className="btn btn-danger"
            title="Excluir"
            // eslint-disable-next-line react/prop-types
            onClick={() => props.deleteAction(usuario)}
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
          <th scope="col">Nome</th>
          <th scope="col">Nome de usuario</th>
          <th scope="col">Email</th>
          <th scope="col">Autoridades</th>
          <th scope="col">Açoes</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};
