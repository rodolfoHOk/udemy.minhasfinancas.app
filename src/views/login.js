import React from 'react';
import { withRouter } from 'react-router-dom';
// import axios from 'axios'; // para teste
import Card from '../components/card';
import FormGroup from '../components/form-group';
import UsuarioService from '../app/service/usuarioService';
// import LocalStorageService from '../app/service/localStorageService';
import { mensagemErro } from '../components/toastr';
import { AuthContext } from '../main/provedorAutenticacao';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeUsuarioOuEmail: '',
      senha: '',
    };
    this.service = new UsuarioService();
  }

  entrar = () => {
    const { nomeUsuarioOuEmail } = this.state;
    const { senha } = this.state;

    const loginRequest = {
      nomeUsuarioOuEmail,
      senha,
    };

    try {
      this.service.validarAutenticacao(loginRequest);
    } catch (erro) {
      const msgs = erro.mensagens;
      msgs.forEach((msg) => mensagemErro(msg));
      return;
    }

    this.service.autenticar({
      nomeUsuarioOuEmail,
      senha,
    }).then((response) => {
      // refatoramos para usar provedorAutenticacao
      // LocalStorageService.adicionarItem('_usuario_logado', response.data);
      const { iniciarSessao } = this.context;
      iniciarSessao(response.data.token); // JWT: response.data para response.token;
      // eslint-disable-next-line react/prop-types
      const { history } = this.props;
      // eslint-disable-next-line react/prop-types
      history.push('/home');
      // console.log(response)
    }).catch((erro) => {
      // eslint-disable-next-line prefer-template
      mensagemErro(erro.response.data.status + ': ' + erro.response.data.message);
    });
    // console.log("Email: ", this.state.email)
    // console.log("Senha: ", this.state.senha)
  }

  /* removido somente administradores agora! removido também o botão cadastrar
  prepareCadastrar = () => {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    // eslint-disable-next-line react/prop-types
    history.push('/cadastro-usuarios');
  }
  */

  render() {
    const { nomeUsuarioOuEmail } = this.state;
    const { senha } = this.state;
    return (
      <div className="row">
        <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
          <div className="bs-docs-section">
            <Card title="Login">
              <div className="row">
                <div className="col-lg-12">
                  <div className="bs-component">
                    <fieldset>
                      <FormGroup label="Nome de Usuário ou Email: *" htmlFor="InputNomeUsuarioOuEmail">
                        <input
                          type="text"
                          className="form-control"
                          id="InputNomeUsuarioOuEmail"
                          placeholder="Digite o Nome de Usuário ou Email"
                          value={nomeUsuarioOuEmail}
                          onChange={(e) => this.setState({ nomeUsuarioOuEmail: e.target.value })}
                        />
                      </FormGroup>
                      <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          placeholder="Password"
                          value={senha}
                          onChange={(e) => this.setState({ senha: e.target.value })}
                        />
                      </FormGroup>
                      <button
                        type="button"
                        onClick={this.entrar}
                        className="btn btn-success"
                      >
                        <i className="pi pi-sign-in" />
                        {' '}
                        Entrar
                      </button>
                    </fieldset>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

Login.contextType = AuthContext;
// só funciona para componentes de classe para função é outro método.

export default withRouter(Login);
