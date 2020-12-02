import React from 'react';
import { withRouter } from 'react-router-dom';
// import LocalStorageService from '../app/service/localStorageService';
import currencyFormatter from 'currency-formatter';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import LancamentosTable from './lancamentos/lancamentosTable';
import UsuarioService from '../app/service/usuarioService';
import LancamentoService from '../app/service/lancamentoService';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import { AuthContext } from '../main/provedorAutenticacao';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.usuarioService = new UsuarioService();
    this.lancamentoService = new LancamentoService();
    this.state = {
      saldo: 0,
      showConfirmDialog: false,
      lancamentoADeletar: {},
      lancamentos: [],
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

    this.buscarPendentes();
  }

  buscarPendentes = () => {
    const { usuarioAutenticado } = this.context;
    const anoAtual = new Date().getFullYear();

    const lancamentoFiltro = {
      ano: anoAtual,
      status: 'PENDENTE',
      usuario: usuarioAutenticado.id,
    };

    this.lancamentoService.consultar(lancamentoFiltro)
      .then((resposta) => {
        const lista = resposta.data;
        this.setState({ lancamentos: lista });
      }).catch((erro) => {
        mensagemErro(erro.response.data);
      });
  }

  editar = (id) => {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    // eslint-disable-next-line react/prop-types
    history.push(`/cadastro-lancamentos/${id}`);
  }

  abrirConfirmacao = (lancamento) => {
    this.setState({ showConfirmDialog: true, lancamentoADeletar: lancamento });
  }

  cancelarDelecao = () => {
    this.setState({ showConfirmDialog: false, lancamentoADeletar: {} });
  }

  deletar = () => {
    const { lancamentoADeletar } = this.state;
    this.lancamentoService
      .deletar(lancamentoADeletar.id)
      .then(() => {
        const { lancamentos } = this.state;
        const index = lancamentos.indexOf(lancamentoADeletar);
        lancamentos.splice(index, 1);
        this.setState({ lancamentos, showConfirmDialog: false });
        mensagemSucesso('Lançamento deletado');
      })
      .catch(() => {
        mensagemErro('Ocorreu um erro ao tentar deletar o lançamento');
      });
  }

  alterarStatus = (lancamento, status) => {
    this.lancamentoService
      .alterarStatus(lancamento.id, status)
      .then(() => {
        const { lancamentos } = this.state;
        const index = lancamentos.indexOf(lancamento);
        if (index !== -1) {
          // eslint-disable-next-line no-param-reassign
          lancamento.status = status;
          lancamentos[index] = lancamento;
          this.setState(lancamentos);
        }
        mensagemSucesso(`Status atualizado para ${status} com sucesso.`);
      })
      .catch((error) => {
        mensagemErro(error.response.data);
      });
  }

  renderFooter() {
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
          autoFocus
        />
      </div>
    );
  }

  render() {
    const { saldo } = this.state;
    const { isAdmin } = this.context;

    const { lancamentos, showConfirmDialog } = this.state;

    return (
      <>
        <div className="jumbotron">
          <h1 className="display-3">Bem vindo!</h1>
          <p className="lead">Esse é seu sistema de finanças.</p>
          <p className="lead">
            Seu saldo para o mês atual é de
            <span> </span>
            {currencyFormatter.format(saldo, { locale: 'pt-BR' })}
          </p>
          <hr className="my-4" />
          <p>
            E essa é sua área administrativa,
            utilize um dos menus ou botões abaixo para navegar pelo sistema.
          </p>
          <p className="lead">
            {
              isAdmin ? (
                <a
                  className="btn btn-primary btn-lg"
                  href="#/cadastro-usuarios"
                  role="button"
                >
                  <i className="pi pi-users" />
                  {' '}
                  Cadastrar Usuário
                </a>
              ) : null
            }

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

        { lancamentos.length > 0 ? (
          <div>
            <div className="row">
              <div className="col-lg-12">
                <div className="bs-component">
                  <h3>Lançamentos pendentes do Ano</h3>
                  <LancamentosTable
                    lancamentos={lancamentos}
                    editeAction={this.editar}
                    deleteAction={this.abrirConfirmacao}
                    alterarStatusAction={this.alterarStatus}
                  />

                </div>
              </div>
            </div>
          </div>
        ) : null }

        <div>

          <Dialog
            header="Confirmação"
            visible={showConfirmDialog}
            style={{ width: '50vw' }}
            // eslint-disable-next-line react/jsx-boolean-value
            modal={true}
            footer={this.renderFooter()}
            onHide={() => this.setState({ showConfirmDialog: false })}
          >
            <p>
              Confirma a exclusão deste lançamento?
            </p>
          </Dialog>

        </div>
      </>
    );
  }
}

Home.contextType = AuthContext;

export default withRouter(Home);
