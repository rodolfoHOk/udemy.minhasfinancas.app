import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import UsuarioService from '../app/service/usuarioService';
import LocalStorageService from '../app/service/localStorageService';

class Login extends React.Component {
  constructor() {
    super();
    this.service = new UsuarioService();
    this.state = {
      email: '',
      senha: '',
      mensagemErro: null,
    };
  }

  entrar = () => {
    const { email } = this.state;
    const { senha } = this.state;
    this.service.autenticar({
      email,
      senha,
    }).then((response) => {
      LocalStorageService.adicionarItem('_usuario_logado', response.data);
      // eslint-disable-next-line react/prop-types
      const { history } = this.props;
      // eslint-disable-next-line react/prop-types
      history.push('/home');
      // console.log(response)
    }).catch((erro) => {
      this.setState({ mensagemErro: erro.response.data });
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
    const { mensagemErro } = this.state;
    return (
      <div className="row">
        <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
          <div className="bs-docs-section">
            <Card title="Login">
              <div className="row">
                <span>{mensagemErro}</span>
              </div>
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
                        Entrar
                      </button>
                      <button
                        type="button"
                        onClick={this.prepareCadastrar}
                        className="btn btn-danger"
                      >
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

export default withRouter(Login);
