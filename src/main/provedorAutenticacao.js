import React from 'react';
import AuthService from '../app/service/authService';
import UsuarioService from '../app/service/usuarioService';
import { mensagemErro } from '../components/toastr';

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class ProvedorAutenticacao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarioAutenticado: null,
      isAutenticado: false,
    };
    this.service = new UsuarioService();
  }

  /*
  iniciarSessao = (usuario) => {
    AuthService.logar(usuario);
    this.setState({ isAutenticado: true, usuarioAutenticado: usuario });
  }

  encerrarSessao = () => {
    AuthService.removerUsuarioAutenticado();
    this.setState({ isAutenticado: false, usuarioAutenticado: null });
  }
  */

  iniciarSessao = (token) => {
    AuthService.logarJwt(token);
    this.service.obterUsuarioAtualLogado()
      .then((response) => {
        this.setState({ isAutenticado: true, usuarioAutenticado: response.data });
      })
      .catch((erro) => {
        mensagemErro(erro.response.data);
      });
  }

  encerrarSessao = () => {
    AuthService.deslogarJwt();
    this.setState({ isAutenticado: false, usuarioAutenticado: null });
  }

  render() {
    const { usuarioAutenticado } = this.state;
    const { isAutenticado } = this.state;

    const contexto = {
      usuarioAutenticado,
      isAutenticado,
      iniciarSessao: this.iniciarSessao,
      encerrarSessao: this.encerrarSessao,
    };

    // eslint-disable-next-line react/prop-types
    const { children } = this.props;

    return (
      <AuthProvider value={contexto}>
        { children }
      </AuthProvider>
    );
  }
}

export default ProvedorAutenticacao;
