import ApiService from '../apiservice';
import ErroValidacao from '../exceptions/erroValidacao';

class UsuarioService extends ApiService {
  constructor() {
    super('/api/usuarios');
  }

  autenticar(credenciais) {
    return this.post('/autenticar', credenciais);
  }

  obterSaldoPorUsuario(id) {
    return this.get(`/${id}/saldo`);
  }

  // eslint-disable-next-line class-methods-use-this
  validar(usuario) {
    const erros = [];

    if (!usuario.nome) {
      erros.push('Campo nome é obrigatório.');
    }

    if (!usuario.email) {
      erros.push('Campo email é obrigatório.');
    } else if (!usuario.email.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]/)) {
      erros.push('Email informado inválido.');
    }

    if (!usuario.senha || !usuario.senhaRepetida) {
      erros.push('Digite a senha duas vezes.');
    } else if (usuario.senha !== usuario.senhaRepetida) {
      erros.push('Senhas não coincidem');
    }

    if (erros && erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }

  salvar(usuario) {
    return this.post('/', usuario);
  }
}

export default UsuarioService;
