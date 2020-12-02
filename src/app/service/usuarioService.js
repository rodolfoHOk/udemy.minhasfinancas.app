import ApiService from '../apiservice';
import ErroValidacao from '../exceptions/erroValidacao';
import {
  TAMANHO_MIN_NOME,
  TAMANHO_MAX_NOME,
  TAMANHO_MIN_NOME_USUARIO,
  TAMANHO_MAX_NOME_USUARIO,
  TAMANHO_MAX_EMAIL,
  TAMANHO_MIN_SENHA,
  TAMANHO_MAX_SENHA,
  REGEX_EMAIL,
} from '../exceptions/constantesValidacao';

class UsuarioService extends ApiService {
  constructor() {
    super('/api/usuarios');
    this.listaAutoridades = [
      { label: 'SELECIONE...', value: '' },
      { label: 'Usuario', value: 'USUARIO' },
      { label: 'Administrador', value: 'ADMINISTRADOR' },
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  validarAutenticacao(loginRequest) {
    const erros = [];

    if (!loginRequest.nomeUsuarioOuEmail) {
      erros.push('Campo nome de usuário ou email é obrigatorio');
    }

    if (loginRequest.nomeUsuarioOuEmail.length > TAMANHO_MAX_EMAIL) {
      erros.push(`Campo nome de usuário ou email tem que ter no máximo ${TAMANHO_MAX_EMAIL} caracteres.`);
    }

    if (!loginRequest.senha) {
      erros.push('Campo senha é obrigatorio');
    }

    if (loginRequest.senha.length < TAMANHO_MIN_SENHA) {
      erros.push(`Campo senha tem que ter no mínimo ${TAMANHO_MIN_SENHA} caracteres.`);
    }

    if (loginRequest.senha.length > TAMANHO_MAX_SENHA) {
      erros.push(`Campo senha tem que ter no máximo ${TAMANHO_MAX_SENHA} caracteres.`);
    }

    if (erros && erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }

  autenticar(credenciais) {
    return this.post('/autenticar', credenciais);
  }

  obterSaldoPorUsuario(id) {
    return this.get(`/${id}/saldo`);
  }

  /**
   * JWT: retorna usuario atual logado, pois só temos o token no localstorage agora.
   */
  obterUsuarioAtualLogado() {
    return this.get('/eu');
  }

  /**
   * JWT: retorna a lista de autoridades
   */
  obterListaAutoridades() {
    return this.listaAutoridades;
  }

  // eslint-disable-next-line class-methods-use-this
  validar(usuario) {
    const erros = [];

    if (!usuario.nome) {
      erros.push('Campo nome é obrigatório.');
    }

    if (usuario.nome.length < TAMANHO_MIN_NOME) {
      erros.push(`Campo nome tem que ter no mínimo ${TAMANHO_MIN_NOME} caracteres.`);
    }

    if (usuario.nome.length > TAMANHO_MAX_NOME) {
      erros.push(`Campo nome tem que ter no máximo ${TAMANHO_MAX_NOME} caracteres.`);
    }

    if (!usuario.nomeUsuario) {
      erros.push('Nome de usuário é obrigatorio');
    }

    if (usuario.nomeUsuario.length < TAMANHO_MIN_NOME_USUARIO) {
      erros.push(`Campo nome de usuário tem que ter no mínimo ${TAMANHO_MIN_NOME_USUARIO} caracteres.`);
    }

    if (usuario.nomeUsuario.length > TAMANHO_MAX_NOME_USUARIO) {
      erros.push(`Campo nome de usuário tem que ter no máximo ${TAMANHO_MAX_NOME_USUARIO} caracteres.`);
    }

    if (!usuario.email) {
      erros.push('Campo email é obrigatório.');
    } else if (!usuario.email.match(REGEX_EMAIL)) {
      erros.push('Email informado inválido.');
    }

    if (usuario.email.length > TAMANHO_MAX_EMAIL) {
      erros.push(`Campo email tem que ter no máximo ${TAMANHO_MAX_EMAIL} caracteres.`);
    }

    if (!usuario.senha || !usuario.senhaRepetida) {
      erros.push('Digite a senha duas vezes.');
    } else if (usuario.senha !== usuario.senhaRepetida) {
      erros.push('Senhas não coincidem');
    }

    if (usuario.senha.length < TAMANHO_MIN_SENHA) {
      erros.push(`Campo senha tem que ter no mínimo ${TAMANHO_MIN_SENHA} caracteres.`);
    }

    if (usuario.senha.length > TAMANHO_MAX_SENHA) {
      erros.push(`Campo senha tem que ter no máximo ${TAMANHO_MAX_SENHA} caracteres.`);
    }

    if (!usuario.autoridade) {
      erros.push('Campo autoridade é obrigatório.');
    }

    if (erros && erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }

  salvar(usuario) {
    return this.post('/cadastrar', usuario);
  }

  consultar(param, valor) {
    return this.get(`?${param}=${valor}`);
  }

  atualizar(usuario) {
    return this.put(`/${usuario.id}`, usuario);
  }

  deletar(id) {
    return this.delete(`/${id}`);
  }

  obterPorId(id) {
    return this.get(`/${id}`);
  }
}

export default UsuarioService;
