import ApiService from '../apiservice';
import ErroValidacao from '../exceptions/erroValidacao';
import { TAMANHO_MIN_DESCRICAO, TAMANHO_MAX_DESCRICAO } from '../exceptions/constantesValidacao';

export default class LancamentoService extends ApiService {
  constructor() {
    super('/api/lancamentos');

    this.meses = [
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

    this.tipos = [
      { label: 'SELECIONE...', value: '' },
      { label: 'Receita', value: 'RECEITA' },
      { label: 'Despesa', value: 'DESPESA' },
    ];

    this.listaStatus = [
      { label: 'SELECIONE...', value: '' },
      { label: 'Pendente', value: 'PENDENTE' },
      { label: 'Efetivado', value: 'EFETIVADO' },
      { label: 'Cancelado', value: 'CANCELADO' },
    ];
  }

  obterListaMeses() {
    return this.meses;
  }

  obterListaTipos() {
    return this.tipos;
  }

  obterListaStatus() {
    return this.listaStatus;
  }

  consultar(lancamentoFiltro) {
    let params = `?ano=${lancamentoFiltro.ano}`;

    if (lancamentoFiltro.mes) {
      params = `${params}&mes=${lancamentoFiltro.mes}`;
    }

    if (lancamentoFiltro.tipo) {
      params = `${params}&tipo=${lancamentoFiltro.tipo}`;
    }

    if (lancamentoFiltro.status) {
      params = `${params}&status=${lancamentoFiltro.status}`;
    }

    if (lancamentoFiltro.usuario) {
      params = `${params}&usuario=${lancamentoFiltro.usuario}`;
    }

    if (lancamentoFiltro.descricao) {
      params = `${params}&descricao=${lancamentoFiltro.descricao}`;
    }

    return this.get(params);
  }

  // eslint-disable-next-line class-methods-use-this
  validar(lancamento) {
    const erros = [];

    if (!lancamento.descricao) {
      erros.push('Campo descrição é obrigatório!');
    }

    if (lancamento.descricao.length < 2) {
      erros.push(`Campo descrição tem que ter no mínimo ${TAMANHO_MIN_DESCRICAO} caracteres!`);
    }

    if (lancamento.descricao.length > 512) {
      erros.push(`Campo descrição tem que ter no máximo ${TAMANHO_MAX_DESCRICAO} caracteres!`);
    }

    if (!lancamento.ano) {
      erros.push('Campo ano é obrigatório!');
    }

    if (lancamento.ano.toString().length !== 4) {
      erros.push('Campo ano tem que ter 4 digitos!');
    }

    if (!lancamento.mes) {
      erros.push('Campo mês é obrigatório!');
    }

    if (lancamento.mes < 1 || lancamento.mes > 12) {
      erros.push('Campo mes deve ter valor entre 1 e 12');
    }

    if (!lancamento.valor) {
      erros.push('Campo valor é obrigatório!');
    }

    if (lancamento.valor < 0.01) {
      erros.push('Campo valor em que ser maior ou igual a 0.01');
    }

    if (!lancamento.tipo) {
      erros.push('Selecione o tipo, é obrigatório!');
    }

    if (erros && erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }

  alterarStatus(id, status) {
    return this.put(`/${id}/atualiza-status`, { status }); // { status } = const atualizaStatusDTO = { status: status }
  }

  deletar(id) {
    return this.delete(`/${id}`);
  }

  salvar(lancamento) {
    return this.post('/', lancamento);
  }

  atualizar(lancamento) {
    return this.put(`/${lancamento.id}`, lancamento);
  }

  obterPorId(id) {
    return this.get(`/${id}`);
  }
}
