import React from 'react';
import {
  Route, Switch, HashRouter, Redirect,
} from 'react-router-dom';
// import AuthService from '../app/service/authService';
import { AuthConsumer } from './provedorAutenticacao';

import Login from '../views/login';
import CadastroUsuario from '../views/usuarios/cadastroUsuario';
import Home from '../views/home';
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos';
import CadastroLancamentos from '../views/lancamentos/cadastro-lancamentos';
import ConsultaUsuarios from '../views/usuarios/consultaUsuarios';

// eslint-disable-next-line react/prop-types
function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }) {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      render={(componentProps) => {
        if (isUsuarioAutenticado) {
          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Component {...componentProps} />
          );
        }
        return (
          <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
        );
      }}
    />
  );
}

/**
 * Adicionamos para somente administradores poderem acessar o cadastro de usuarios
 */
function RotaAdministrador({
  // eslint-disable-next-line react/prop-types
  component: Component, isUsuarioAutenticado, isAdmin, ...props
}) {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      render={(componentProps) => {
        if (isUsuarioAutenticado && isAdmin) {
          return (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Component {...componentProps} />
          );
        }
        return (
          <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
        );
      }}
    />
  );
}

function Rotas(props) {
  // eslint-disable-next-line react/prop-types
  const { isUsuarioAutenticado } = props;
  // eslint-disable-next-line react/prop-types
  const { isAdmin } = props;
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <RotaAdministrador isUsuarioAutenticado={isUsuarioAutenticado} isAdmin={isAdmin} path="/consulta-usuarios" component={ConsultaUsuarios} />
        <RotaAdministrador isUsuarioAutenticado={isUsuarioAutenticado} isAdmin={isAdmin} path="/cadastro-usuario/:id?" component={CadastroUsuario} />
        <RotaAdministrador isUsuarioAutenticado={isUsuarioAutenticado} isAdmin={isAdmin} path="/cadastro-usuario" component={CadastroUsuario} />
        <RotaAutenticada isUsuarioAutenticado={isUsuarioAutenticado} path="/home" component={Home} />
        <RotaAutenticada isUsuarioAutenticado={isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos} />
        <RotaAutenticada isUsuarioAutenticado={isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
      </Switch>
    </HashRouter>
  );
}

export default () => (
  <AuthConsumer>
    { (context) => (
      <Rotas
        isUsuarioAutenticado={context.isAutenticado}
        isAdmin={context.isAdmin}
      />
    ) }
  </AuthConsumer>
);
