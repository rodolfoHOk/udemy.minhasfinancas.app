import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../components/card';
import FormGroup from '../components/form-group';

class CadastroUsuario extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      senha: '',
      senhaRepetida: '',
    };
  }

  voltar = () => {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    // eslint-disable-next-line react/prop-types
    history.push('/login');
  }

  cadastrar = () => {
    console.log(this.state);
  }

  render() {
    const { nome } = this.state;
    const { email } = this.state;
    const { senha } = this.state;
    const { senhaRepetida } = this.state;
    return (
      <Card title="Cadastro de Usuário">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <fieldset>
                <FormGroup label="Nome: *" htmlFor="inputNome">
                  <input
                    type="text"
                    className="form-control"
                    id="inputNome"
                    name="nome"
                    aria-describedby="emailHelp"
                    placeholder="Digite o Nome"
                    value={nome}
                    onChange={(e) => this.setState({ nome: e.target.value })}
                  />
                </FormGroup>
                <FormGroup label="Email: *" htmlFor="inputEmail">
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Digite o Email"
                    value={email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                  <small id="emailHelp" className="form-text text-muted">Não divulgamos o seu email.</small>
                </FormGroup>
                <FormGroup label="Senha: *" htmlFor="inputPassword1">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword1"
                    name="senha1"
                    placeholder="Password"
                    value={senha}
                    onChange={(e) => this.setState({ senha: e.target.value })}
                  />
                </FormGroup>
                <FormGroup label="Repita a senha: *" htmlFor="inputPassword2">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword2"
                    name="senha2"
                    placeholder="Password"
                    value={senhaRepetida}
                    onChange={(e) => this.setState({ senhaRepetida: e.target.value })}
                  />
                </FormGroup>
                <button
                  type="button"
                  onClick={this.cadastrar}
                  className="btn btn-success"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={this.voltar}
                  className="btn btn-danger"
                >
                  Voltar
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroUsuario);
