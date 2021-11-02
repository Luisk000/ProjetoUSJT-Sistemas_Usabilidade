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

    public salvarDadosLocaisUsuario(token: string, dadosAdmin: string) {
        this.salvarTokenUsuario(token);
        this.salvarUsuario(dadosAdmin);
    }

    public salvarUsuario(dadosAdmin: string) {
        localStorage.setItem('wk.usuario', dadosAdmin);
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('wk.token-usuario', token);
    }
    
    public obterUsuario() {
        return JSON.parse(localStorage.getItem('wk.usuario'));
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('wk.token-usuario');
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('wk.token-usuario');
        localStorage.removeItem('wk.usuario');
    }
}
