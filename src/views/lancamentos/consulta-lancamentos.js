import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentosTable';
import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localStorageService';
import { mensagemErro } from '../../components/toastr';

class ConsultaLancamento extends React.Component {
  constructor() {
    super();
    this.service = new LancamentoService();
    this.state = {
      ano: '',
      mes: '',
      tipo: '',
      lancamentos: [],
    };
  }

  buscar = () => {
    const { ano } = this.state;
    const { mes } = this.state;
    const { tipo } = this.state;

    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

    const lancamentoFiltro = {
      ano,
      mes,
      tipo,
      usuario: usuarioLogado.id,
    };

    this.service.consultar(lancamentoFiltro)
      .then((resposta) => {
        this.setState({ lancamentos: resposta.data });
      }).catch((error) => {
        mensagemErro(error.response.data);
      });
  }

  render() {
    const { ano } = this.state;
    const { mes } = this.state;
    const { tipo } = this.state;
    const { lancamentos } = this.state;

    const listaMes = [
      { label: 'SELECIONE...', value: '' },
      { label: 'Janeiro', value: 1 },
      { label: 'Fevereiro', value: 2 },
      { label: 'Março', value: 3 },
      { label: 'Abril', value: 4 },
      { label: 'Maio', value: 5 },
      { label: 'Junho', value: 6 },
      { label: 'Julho', value: 7 },
      { label: 'Agosto', value: 8 },
      { label: 'Setembro', value: 9 },
      { label: 'Outubro', value: 10 },
      { label: 'Novembro', value: 11 },
      { label: 'Dezembro', value: 12 },
    ];
    const listaTipo = [
      { label: 'SELECIONE...', value: '' },
      { label: 'Receita', value: 'RECEITA' },
      { label: 'Despesa', value: 'DESPESA' },
    ];

    /* somente para testar o front end
    const lancamentosTeste = [
      {
        id: 1, descricao: 'Salário', valor: 5000, tipo: 'RECEITA', mes: 1, status: 'EFETIVADO',
      },
      {
        id: 2, descricao: 'Fatura cartão', valor: 250, tipo: 'DESPESA', mes: 1, status: 'PENDENTE',
      },
    ];
    */

    return (
      <>
        <Card title="Busca Lançamento">
          <div className="row">
            <div className="col-lg-6">
              <div className="bs-component">
                <fieldset>
                  <FormGroup label="Ano: *" htmlfor="inputAno">
                    <input
                      type="text"
                      className="form-control"
                      id="inputAno"
                      placeholder="Digite o Ano"
                      value={ano}
                      onChange={(e) => this.setState({ ano: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup label="Mês: " htmlfor="inputMes">
                    <SelectMenu
                      className="form-control"
                      id="inputMes"
                      lista={listaMes}
                      value={mes}
                      onChange={(e) => this.setState({ mes: e.target.value })}

                    />
                  </FormGroup>
                  <FormGroup label="Tipo Lançamento: " htmlfor="inputTipo">
                    <SelectMenu
                      className="form-control"
                      id="inputTipo"
                      lista={listaTipo}
                      value={tipo}
                      onChange={(e) => this.setState({ tipo: e.target.value })}
                    />
                  </FormGroup>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.buscar}
                  >
                    Buscar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                  >
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
                <LancamentosTable lancamentos={lancamentos} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ConsultaLancamento);
