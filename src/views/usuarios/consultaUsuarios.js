import React from 'react';
import { withRouter } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { AuthContext } from '../../main/provedorAutenticacao';
import UsuarioService from '../../app/service/usuarioService';
import { mensagemErro, mensagemSucesso, mensagemAlerta } from '../../components/toastr';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import UsuarioTable from './usuarioTable';

class ConsultaUsuarios extends React.Component {
  constructor(props) {
    super(props);
    this.service = new UsuarioService();
    this.state = {
      param: '',
      valor: '',
      usuarios: [],
      usuarioADeletar: {},
      showConfirmDialog: false,
    };
  }

  buscar = () => {
    const { param, valor } = this.state;
    this.service.consultar(param, valor)
      .then((resposta) => {
        const lista = resposta.data;
        if (lista < 1) {
          mensagemAlerta('Nenhum resultado encontrado!');
        }
        this.setState({ usuarios: lista });
      }).catch((erro) => {
        mensagemErro(erro.response.data);
      });
  };

  editar = (id) => {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    // eslint-disable-next-line react/prop-types
    history.push(`/cadastro-usuario/${id}`);
  };

  abrirConfirmacao = (usuario) => {
    this.setState({ showConfirmDialog: true, usuarioADeletar: usuario });
  };

  cancelarDelecao = () => {
    this.setState({ showConfirmDialog: false, usuarioADeletar: {} });
  };

  deletar = () => {
    const { usuarioADeletar } = this.state;
    this.service.deletar(usuarioADeletar.id)
      .then(() => {
        const { usuarios } = this.state;
        const index = usuarios.indexOf(usuarioADeletar);
        usuarios.splice(index, 1);
        this.setState({ usuarios, showConfirmDialog: false });
        mensagemSucesso('Usuario deletado.');
      }).catch(() => {
        mensagemErro('Ocorreu um erro ao tentar deletar o usuário');
      });
  };

  prepararCadastroUsuario = () => {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    // eslint-disable-next-line react/prop-types
    history.push('/cadastro-usuario');
  };

  renderFotterDialog() {
    return (
      <div>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={this.cancelarDelecao}
          className="p-button-text"
        />
        <span> </span>
        <Button
          label="Confirmar"
          icon="pi pi-check"
          onClick={this.deletar}
          className="p-button-text"
          autoFocus
        />
      </div>
    );
  }

  render() {
    const { param, valor } = this.state;

    const { usuarios, showConfirmDialog } = this.state;

    const listaParam = [
      { label: 'SELECIONE...', value: '' },
      { label: 'Nome', value: 'nome' },
      { label: 'Nome de Usuário', value: 'nomeUsuario' },
      { label: 'Email', value: 'email' },
    ];

    return (
      <>
        <Card title="Consulta de Usuários">
          <div className="row">
            <div className="col-lg-4">
              <div className="bs-component">
                <fieldset>

                  <FormGroup label="Buscar Por: *" htmlfor="inputParam">
                    <SelectMenu
                      className="form-control"
                      id="inputParam"
                      lista={listaParam}
                      value={param}
                      onChange={(e) => this.setState({ param: e.target.value })}
                    />
                  </FormGroup>

                </fieldset>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="bs-component">
                <fieldset>

                  <FormGroup label="Texto" htmlfor="inputValor">
                    <input
                      type="text"
                      className="form-control"
                      id="inputValor"
                      placeholder="Digite o texto a procurar"
                      value={valor}
                      onChange={(e) => this.setState({ valor: e.target.value })}
                    />
                  </FormGroup>

                </fieldset>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">
                <fieldset>

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.buscar}
                  >
                    <i className="pi pi-search" />
                    Buscar
                  </button>

                  <span> </span>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.prepararCadastroUsuario}
                  >
                    <i className="pi pi-plus" />
                    Cadastrar
                  </button>

                </fieldset>
              </div>
            </div>
          </div>
        </Card>

        <br />

        <div>
          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">

                <UsuarioTable
                  usuarios={usuarios}
                  editeAction={this.editar}
                  deleteAction={this.abrirConfirmacao}
                />

              </div>
            </div>
          </div>
        </div>

        <div>
          <Dialog
            header="Confirmação"
            visible={showConfirmDialog}
            style={{ width: '50vw' }}
            // eslint-disable-next-line react/jsx-boolean-value
            modal={true}
            footer={this.renderFotterDialog()}
            onHide={() => this.setState({ showConfirmDialog: false })}
          >
            <p> Confirma a exclusão deste usuário? </p>
          </Dialog>
        </div>
      </>
    );
  }
}

ConsultaUsuarios.contextType = AuthContext;

export default withRouter(ConsultaUsuarios);
