import React from 'react';
import NavbarItem from './navbarItem';
// import AuthService from '../app/service/authService';
import { AuthConsumer } from '../main/provedorAutenticacao';

/* refatorado para usar provedeorAutenticacao
const deslogar = () => {
  AuthService.removerUsuarioAutenticado();
};
*/

/* refatorado para usar provedeorAutenticacao
const isUsuarioLogado = () => {
  AuthService.removerUsuarioAutenticado()
};
*/

function Navbar(props) {
  // eslint-disable-next-line react/prop-types
  const { isUsuarioAutenticado } = props;
  // eslint-disable-next-line react/prop-types
  const { deslogar } = props;
  return (
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
        <a href="#/home" className="navbar-brand">Minhas Finanças</a>
        <button
          className="navbar-toggler"
          type="button"
          ata-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <NavbarItem render={isUsuarioAutenticado} label="Home" href="#/home" />
            <NavbarItem render={isUsuarioAutenticado} label="Usuários" href="#/cadastro-usuarios" />
            <NavbarItem render={isUsuarioAutenticado} label="Lancamentos" href="#/consulta-lancamentos" />
            <NavbarItem render={isUsuarioAutenticado} label="Sair" href="#/login" onClick={deslogar} />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default () => (
  <AuthConsumer>
    {(context) => (
      <Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />
    )}
  </AuthConsumer>
);
