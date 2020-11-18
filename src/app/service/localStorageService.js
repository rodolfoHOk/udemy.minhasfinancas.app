class LocalStorageService {
  static adicionarItem(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
  }

  static obterItem(chave) {
    return localStorage.getItem(chave);
  }

  static removerItem(chave) {
    localStorage.removeItem(chave);
  }
}

export default LocalStorageService;
