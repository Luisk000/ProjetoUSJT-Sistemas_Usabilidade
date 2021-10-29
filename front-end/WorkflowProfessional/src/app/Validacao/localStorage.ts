export class LocalStorageUtils{

  public obterUsuario() {
        return JSON.parse(localStorage.getItem('wk.user'));
    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.userToken);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('wk.token');
        localStorage.removeItem('wk.user');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('wk.token');
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('wk.token', token);
    }

    public salvarUsuario(user: string) {
        localStorage.setItem('wk.user', JSON.stringify(user));
    }
}
