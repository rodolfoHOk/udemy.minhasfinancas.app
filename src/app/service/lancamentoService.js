import ApiService from '../apiservice';

import ErroValidacao from '../exceptions/erroValidacao';

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
  }

  obterListaMeses() {
    return this.meses;
  }

  obterListaTipos() {
    return this.tipos;
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

    if (!lancamento.ano) {
      erros.push('Campo ano é obrigatório!');
    }

    if (!lancamento.mes) {
      erros.push('Campo mês é obrigatório!');
    }

    if (!lancamento.valor) {
      erros.push('Campo valor é obrigatório!');
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
