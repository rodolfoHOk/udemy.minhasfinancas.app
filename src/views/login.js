import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import UsuarioService from '../app/service/usuarioService';
// import LocalStorageService from '../app/service/localStorageService';
import { mensagemErro } from '../components/toastr';
import { AuthContext } from '../main/provedorAutenticacao';

class Login extends React.Component {
  constructor() {
    super();
    this.service = new UsuarioService();
    this.state = {
      email: '',
      senha: '',
    };
  }

  entrar = () => {
    const { email } = this.state;
    const { senha } = this.state;
    this.service.autenticar({
      email,
      senha,
    }).then((response) => {
      // refatoramos para usar provedorAutenticacao
      // LocalStorageService.adicionarItem('_usuario_logado', response.data);
      const { iniciarSessao } = this.context;
      iniciarSessao(response.data);
      // eslint-disable-next-line react/prop-types
      const { history } = this.props;
      // eslint-disable-next-line react/prop-types
      history.push('/home');
      // console.log(response)
    }).catch((erro) => {
      mensagemErro(erro.response.data);
      // console.log(erro.response)
    });
    // console.log("Email: ", this.state.email)
    // console.log("Senha: ", this.state.senha)
  }

  prepareCadastrar = () => {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    // eslint-disable-next-line react/prop-types
    history.push('/cadastro-usuarios');
  }

  render() {
    const { email } = this.state;
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
                      <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Digite o Email"
                          value={email}
                          onChange={(e) => this.setState({ email: e.target.value })}
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

                      <button
                        type="button"
                        onClick={this.prepareCadastrar}
                        className="btn btn-danger"
                      >
                        <i className="pi pi-plus" />
                        {' '}
                        Cadastrar
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
