import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import UsuarioService from '../../app/service/usuarioService';
import SelectMenu from '../../components/selectMenu';
import { mensagemErro, mensagemSucesso } from '../../components/toastr';
import { AuthContext } from '../../main/provedorAutenticacao';

class CadastroUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.service = new UsuarioService();
    this.state = {
      id: null,
      nome: '',
      nomeUsuario: '',
      email: '',
      senha: '',
      senhaRepetida: '',
      autoridade: '',
      atualizando: false,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types, react/destructuring-assignment
    const { params } = this.props.match;
    // eslint-disable-next-line react/prop-types
    if (params.id) {
      // eslint-disable-next-line react/prop-types
      this.service.obterPorId(params.id)
        .then((resposta) => {
          this.setState({ ...resposta.data, atualizando: true });
          for (let index = 0; index < resposta.data.autoridades.length; index += 1) {
            if (resposta.data.autoridades[index].nome === 'ADMINISTRADOR') {
              this.setState({ autoridade: 'ADMINISTRADOR' });
            }
          }
          const { autoridade } = this.state;
          if (autoridade === '') {
            this.setState({ autoridade: 'USUARIO' });
          }
        }).catch((erro) => {
          mensagemErro(erro.response.data);
        });
    }
  }

  voltar = () => {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    // eslint-disable-next-line react/prop-types
    history.push('/home');
  }

  cadastrar = () => {
    const {
      nome, nomeUsuario, email, senha, senhaRepetida, autoridade,
    } = this.state;

    const usuarioACadastrar = {
      nome,
      nomeUsuario,
      email,
      senha,
      senhaRepetida,
      autoridade,
    };

    try {
      this.service.validar(usuarioACadastrar);
    } catch (erro) {
      const msgs = erro.mensagens;
      msgs.forEach((msg) => mensagemErro(msg));
      return;
    }

    this.service.salvar(usuarioACadastrar)
      .then(() => {
        mensagemSucesso('Usuario cadastrado. Faça o login para acessar o sistema.');
        // eslint-disable-next-line react/prop-types
        const { history } = this.props;
        // eslint-disable-next-line react/prop-types
        history.push('/login');
      }).catch((erro) => {
        mensagemErro(erro.response.data);
      });
    // console.log(this.state);
  }

  atualizar = () => {
    const {
      id, nome, nomeUsuario, email, senha, senhaRepetida, autoridade,
    } = this.state;

    const usuarioAAtualizar = {
      id,
      nome,
      nomeUsuario,
      email,
      senha,
      senhaRepetida,
      autoridade,
    };

    try {
      this.service.validar(usuarioAAtualizar);
    } catch (erro) {
      const msgs = erro.mensagens;
      msgs.forEach((msg) => mensagemErro(msg));
      return;
    }

    this.service.atualizar(usuarioAAtualizar)
      .then(() => {
        mensagemSucesso('Usuario atualizado.');
        // eslint-disable-next-line react/prop-types
        const { history } = this.props;
        // eslint-disable-next-line react/prop-types
        history.push('/consulta-usuarios');
      }).catch((erro) => {
        mensagemErro(erro.response.data);
      });
  }

  render() {
    const { nome } = this.state;
    const { nomeUsuario } = this.state;
    const { email } = this.state;
    const { senha } = this.state;
    const { senhaRepetida } = this.state;
    const { autoridade } = this.state;
    const { atualizando } = this.state;

    const listaAutoridades = this.service.obterListaAutoridades();

    return (
      <Card title={atualizando ? 'Atualização de Usuário' : 'Cadastro de Usuário'}>
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
                    placeholder="Digite o Nome"
                    value={nome}
                    onChange={(e) => this.setState({ nome: e.target.value })}
                  />
                </FormGroup>
                <FormGroup label="Nome de Usuário: *" htmlFor="inputNomeUsuario">
                  <input
                    type="text"
                    className="form-control"
                    id="inputNomeUsuario"
                    name="nomeUsuario"
                    placeholder="Digite o Nome de Usuário"
                    value={nomeUsuario}
                    onChange={(e) => this.setState({ nomeUsuario: e.target.value })}
                  />
                </FormGroup>
                <FormGroup label="Email: *" htmlFor="inputEmail">
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    name="email"
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
                <FormGroup label="Autoridade: *" htmlfor="inputAutoridade">
                  <SelectMenu
                    className="form-control"
                    id="inputAutoridade"
                    lista={listaAutoridades}
                    value={autoridade}
                    name="autoridade"
                    onChange={(e) => this.setState({ autoridade: e.target.value })}
                  />
                </FormGroup>
                { atualizando ? (
                  <button
                    type="button"
                    onClick={this.atualizar}
                    className="btn btn-success"
                  >
                    <i className="pi pi-save" />
                    {' '}
                    Atualizar
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={this.cadastrar}
                    className="btn btn-success"
                  >
                    <i className="pi pi-save" />
                    {' '}
                    Salvar
                  </button>
                )}

                <button
                  type="button"
                  onClick={this.voltar}
                  className="btn btn-danger"
                >
                  <i className="pi pi-chevron-left" />
                  {' '}
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

CadastroUsuario.contextType = AuthContext;

export default withRouter(CadastroUsuario);
