import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import {withRouter} from 'react-router-dom';

class CadastroUsuario extends React.Component {

  state = {
    nome: '',
    email: '',
    senha: '',
    senhaRepetida: ''
  }
  
  voltar = () => {
    this.props.history.push('/login')
  }
  
  cadastrar = () => {
    console.log(this.state);
  }

  render(){
    return (
      <Card title="Cadastro de Usuário">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <fieldset>
                <FormGroup label="Nome: *" htmlFor="inputNome">
                  <input type="text"
                    className="form-control"
                    id="inputNome"
                    name="nome"
                    aria-describedby="emailHelp"
                    placeholder="Digite o Nome"
                    value={this.state.nome}
                    onChange={(e) => this.setState({nome: e.target.value})}/>
                </FormGroup>
                <FormGroup label="Email: *" htmlFor="inputEmail">
                  <input type="email"
                    className="form-control"
                    id="inputEmail"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Digite o Email"
                    value={this.state.email}
                    onChange={(e) => this.setState({email: e.target.value})}/>
                  <small id="emailHelp" class="form-text text-muted">Não divulgamos o seu email.</small>
                </FormGroup>
                <FormGroup label="Senha: *" htmlFor="inputPassword1">
                  <input type="password"
                    className="form-control"
                    id="inputPassword1"
                    name="senha1"
                    placeholder="Password"
                    value={this.state.senha}
                    onChange={(e) => this.setState({senha: e.target.value})}/>
                </FormGroup>
                <FormGroup label="Repita a senha: *" htmlFor="inputPassword2">
                  <input type="password"
                    className="form-control"
                    id="inputPassword2"
                    name="senha2"
                    placeholder="Password"
                    value={this.state.senhaRepetida}
                    onChange={(e) => this.setState({senhaRepetida: e.target.value})}/>
                </FormGroup>
                <button type="button" 
                  onClick={this.cadastrar} 
                  className="btn btn-success">Salvar</button>
                <button type="button" 
                  onClick={this.voltar} 
                  className="btn btn-danger">Voltar</button>
              </fieldset>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

export default withRouter(CadastroUsuario);