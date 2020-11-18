import LocalStorageService from './localStorageService';

export const USUARIO_LOGADO = '_usuario_logado';

export const TOKEN = 'token_key';

export default class AuthService {
  static isUsuarioAutenticado() {
    const usuario = LocalStorageService.obterItem(USUARIO_LOGADO);
    return usuario && usuario.id;
  }

  static removerUsuarioAutenticado() {
    LocalStorageService.removerItem(USUARIO_LOGADO);
  }

  static logar(usuario) {
    LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario);
  }

  static obterUsuarioAutenticado() {
    return LocalStorageService.obterItem(USUARIO_LOGADO);
  }

  /**
   * JWT: Verifica se está autenticado ou seja existe ou não token
   */
  static isAutenticadoJwt() {
    return LocalStorageService.obterItem(TOKEN) != null;
  }

  /**
   * JWT: Obter o token do localstorage
   */
  static getToken() {
    return LocalStorageService.obterItem(TOKEN);
  }

  /**
   * JWT: Logar um usuario ou seja armazena o token no localstorage
   * @param {*} token token jwt recebido do servidor da api
   */
  static logarJwt(token) {
    LocalStorageService.adicionarItem(TOKEN, token);
  }

  /**
   * JWT: Deslogar o usuario ou seja remove o token do localstorage
   */
  static deslogarJwt() {
    LocalStorageService.removerItem(TOKEN);
  }
}
