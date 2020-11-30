import React from 'react';
import { withRouter } from 'react-router-dom';

import IntlCurrencyInput from 'react-intl-currency-input';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';

import LancamentoService from '../../app/service/lancamentoService';
// import LocalStorageService from '../../app/service/localStorageService'; JWT

import { AuthContext } from '../../main/provedorAutenticacao'; // JWT

import * as messages from '../../components/toastr';

class CadastroLancamentos extends React.Component {
  constructor(props) {
    super(props);
    this.service = new LancamentoService();
    this.state = {
      id: null,
      descricao: '',
      ano: '',
      mes: '',
      valor: '',
      tipo: '',
      status: 'PENDENTE',
      usuario: null,
      atualizando: false,
    };
  }

  componentDidMount() {
    const {
      // eslint-disable-next-line react/prop-types
      params,
    // eslint-disable-next-line react/destructuring-assignment
    } = this.props
      // eslint-disable-next-line react/prop-types
      .match;
    // eslint-disable-next-line react/prop-types
    if (params.id) {
      this.service
        // eslint-disable-next-line react/prop-types
        .obterPorId(params.id)
        .then((response) => {
          this.setState({ ...response.data, atualizando: true });
        })
        .catch((error) => {
          messages.mensagemErro(error.response.data);
        });
    }
    // console.log(params);
  }

  handleChange = (event) => {
    const { value } = event.target;
    const { name } = event.target;

    this.setState({ [name]: value });
  }

  handleChangeValor = (event, value) => {
    event.preventDefault();
    this.setState({ valor: value });
  }

  submit = () => {
    const {
      descricao, ano, mes, valor, tipo,
    } = this.state;

    // const usuarioLogado = LocalStorageService.obterItem('_usuario_logado'); JWT
    const { usuarioAutenticado } = this.context;

    const lancamentoACadastrar = {
      descricao,
      ano,
      mes,
      valor,
      tipo,
      usuario: usuarioAutenticado.id, // JWT mudamos de usuarioLogado.
    };

    try {
      this.service.validar(lancamentoACadastrar);
    } catch (erro) {
      const { mensagens } = erro;
      mensagens.forEach((mensagem) => messages.mensagemErro(mensagem));
      return;
    }

    this.service
      .salvar(lancamentoACadastrar)
      .then(() => {
        // eslint-disable-next-line react/prop-types
        const { history } = this.props;
        // eslint-disable-next-line react/prop-types
        history.push('/consulta-lancamentos');
        messages.mensagemSucesso('Lancamento cadastrado com sucesso');
      })
      .catch((error) => {
        messages.mensagemErro(error.response.data);
      });
  }

  atualizar = () => {
    const {
      id, descricao, ano, mes, valor, tipo, status, usuario,
    } = this.state;

    const lancamentoAAtualizar = {
      id,
      descricao,
      ano,
      mes,
      valor,
      tipo,
      status,
      usuario,
    };

    try {
      this.service.validar(lancamentoAAtualizar);
    } catch (erro) {
      const { mensagens } = erro;
      mensagens.forEach((mensagem) => messages.mensagemErro(mensagem));
      return;
    }

    this.service
      .atualizar(lancamentoAAtualizar)
      .then(() => {
        // eslint-disable-next-line react/prop-types
        const { history } = this.props;
        // eslint-disable-next-line react/prop-types
        history.push('/consulta-lancamentos');
        messages.mensagemSucesso('Lancamento atualizado com sucesso');
      })
      .catch((error) => {
        messages.mensagemErro(error.response.data);
      });
  }

  render() {
    const {
      descricao, ano, mes, valor, tipo, status, atualizando,
    } = this.state;

    const listaMeses = this.service.obterListaMeses();
    const listaTipos = this.service.obterListaTipos();

    const currencyConfig = {
      locale: 'pt-BR',
      formats: {
        number: {
          BRL: {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
        },
      },
    };

    return (
      <Card title={atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <fieldset>

                <FormGroup label="Descrição: *" htmlfor="inputDescricao">
                  <input
                    type="text"
                    className="form-control"
                    id="inputDescricao"
                    placeholder="Digite a descrição"
                    value={descricao}
                    name="descricao"
                    onChange={this.handleChange}
                  />
                </FormGroup>

              </fieldset>
            </div>
          </div>
        </div>

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
                    name="ano"
                    onChange={this.handleChange}
                  />
                </FormGroup>

              </fieldset>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="bs-component">
              <fieldset>

                <FormGroup label="Mês: *" htmlfor="inputMes">
                  <SelectMenu
                    className="form-control"
                    id="inputMes"
                    lista={listaMeses}
                    value={mes}
                    name="mes"
                    onChange={this.handleChange}
                  />
                </FormGroup>

              </fieldset>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="bs-component">
              <fieldset>

                <FormGroup label="Valor: *" htmlfor="inputValor">
                  <IntlCurrencyInput
                    className="form-control"
                    id="inputValor"
                    name="valor"
                    currency="BRL"
                    defaultValue={valor}
                    config={currencyConfig}
                    onChange={this.handleChangeValor}
                    autoFocus
                    autoSelect
                  />
                </FormGroup>

              </fieldset>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="bs-component">
              <fieldset>

                <FormGroup label="Tipo Lançamento: *" htmlfor="inputTipo">
                  <SelectMenu
                    className="form-control"
                    id="inputTipo"
                    lista={listaTipos}
                    value={tipo}
                    name="tipo"
                    onChange={this.handleChange}
                  />
                </FormGroup>

              </fieldset>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="bs-component">
              <fieldset>

                <FormGroup label="Status: " htmlfor="inputStatus">
                  <input
                    type="text"
                    className="form-control"
                    id="inputStatus"
                    value={status}
                    name="status"
                    disabled
                  />
                </FormGroup>

              </fieldset>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              {
                atualizando ? (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.atualizar}
                  >
                    <i className="pi pi-refresh" />
                    {' '}
                    Atualizar
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.submit}
                  >
                    <i className="pi pi-save" />
                    {' '}
                    Salvar
                  </button>
                )
              }

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  // eslint-disable-next-line react/prop-types
                  const { history } = this.props;
                  // eslint-disable-next-line react/prop-types
                  history.push('/consulta-lancamentos');
                }}
              >
                <i className="pi pi-times" />
                {' '}
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

CadastroLancamentos.contextType = AuthContext; // JWT

export default withRouter(CadastroLancamentos);
