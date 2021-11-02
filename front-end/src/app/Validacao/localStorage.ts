import { DadosAdmin } from "../Telas/admin/models/vagasModel";

export class LocalStorageUtils{

    public salvarDadosLocaisAdmin(token: string, dadosAdmin: string) {
        this.salvarTokenAdmin(token);
        this.salvarAdmin(dadosAdmin);
    }

    public salvarAdmin(dadosAdmin: string) {
        localStorage.setItem('wk.admin', dadosAdmin);
    }

    public salvarTokenAdmin(token: string) {
        localStorage.setItem('wk.token-admin', token);
    }
    
    public obterAdmin() {
        return JSON.parse(localStorage.getItem('wk.admin'));
    }

    public obterTokenAdmin(): string {
        return localStorage.getItem('wk.token-admin');
    }

    public limparDadosLocaisAdmin() {
        localStorage.removeItem('wk.token-admin');
        localStorage.removeItem('wk.admin');
    }

    //-----------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('wk.token');
        localStorage.removeItem('wk.user');
    }
    
    public obterUsuario() {
        return JSON.parse(localStorage.getItem('wk.user'));
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
