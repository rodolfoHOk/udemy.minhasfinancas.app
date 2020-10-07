import React from 'react';
// import LocalStorageService from '../app/service/localStorageService';
import { AuthContext } from '../main/provedorAutenticacao';
import UsuarioService from '../app/service/usuarioService';
import { mensagemErro } from '../components/toastr';

class Home extends React.Component {
  constructor() {
    super();
    this.usuarioService = new UsuarioService();
    this.state = {
      saldo: 0,
    };
  }

  componentDidMount() {
    // const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
    const { usuarioAutenticado } = this.context;

    this.usuarioService.obterSaldoPorUsuario(`${usuarioAutenticado.id}`)
      .then((response) => {
        this.setState({ saldo: response.data });
      }).catch((error) => {
        mensagemErro(error.response.data);
        // console.log(error.response);
      });
  }

  render() {
    const { saldo } = this.state;
    return (
      <div className="jumbotron">
        <h1 className="display-3">Bem vindo!</h1>
        <p className="lead">Esse é seu sistema de finanças.</p>
        <p className="lead">
          Seu saldo para o mês atual é de R$
          {saldo}
        </p>
        <hr className="my-4" />
        <p>
          E essa é sua área administrativa,
          utilize um dos menus ou botões abaixo para navegar pelo sistema.
        </p>
        <p className="lead">
          <a
            className="btn btn-primary btn-lg"
            href="#/cadastro-usuarios"
            role="button"
          >
            <i className="pi pi-users" />
            {' '}
            Cadastrar Usuário
          </a>

          <a
            className="btn btn-danger btn-lg"
            href="#/cadastro-lancamentos"
            role="button"
          >
            <i className="pi pi-money-bill" />
            {' '}
            Cadastrar Lançamento
          </a>
        </p>
      </div>
    );
  }
}

Home.contextType = AuthContext;

export default Home;
