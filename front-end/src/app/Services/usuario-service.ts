import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { BaseService } from 'src/app/services/base.service';
import { HttpApiResponse } from "src/app/Models/http-api-response";
import { DadosUsuario } from "../Telas/usuario/models/vagasUsuario";

@Injectable()
export class UsuarioService extends BaseService {

    constructor(private http: HttpClient) { super() }    

    //Microsservicos
    // obterUsuarioPorEmail(email: string): Observable<HttpApiResponse<DadosUsuario>> {
    //     return this.http
    //         .get<HttpApiResponse<DadosUsuario>>(this.UrlServiceCadastroUsuario + "obterPorEmail/" + email, super.ObterHeaderJson())
    //         .pipe(catchError(super.serviceError));
    // }

    // obterPorId(id: string): Observable<HttpApiResponse<DadosUsuario>> {
    //     return this.http
    //         .get<HttpApiResponse<DadosUsuario>>(this.UrlServiceCadastroUsuario + "obterPorId/" + id, super.ObterHeaderJson())
    //         .pipe(catchError(super.serviceError));
    // }

    // cadastrarUsuario(email: string): Observable<HttpApiResponse<any>> {
    //     return this.http.post<HttpApiResponse<any>>(`${this.UrlServiceCadastroUsuario}cadastrar`,{email}, super.ObterHeaderJson());
    // }

    // atualizarUsuario(usuario: DadosUsuario): Observable<HttpApiResponse<any>> {
    //     let id = usuario.id;
    //     let nome = usuario.nome;
    //     let email = usuario.email;
    //     let data_nascimento = usuario.dataNascimento;
    //     let profissao = usuario.profissao;
    //     let experiencia = usuario.experiencia;
    //     let cursos = usuario.cursos;
    //     return this.http.put<HttpApiResponse<any>>(`${this.UrlServiceCadastroUsuario}atualizar/${id}`,{usuario,nome,email,data_nascimento,profissao,experiencia,cursos}, super.ObterHeaderJson());
    // }

    //Monolito
    obterUsuarioPorEmail(email: string): Observable<HttpApiResponse<DadosUsuario>> {
        return this.http
            .get<HttpApiResponse<DadosUsuario>>(this.UrlServiceCadastroUsuarioMonolito + "obterPorEmail/" + email, super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<HttpApiResponse<DadosUsuario>> {
        return this.http
            .get<HttpApiResponse<DadosUsuario>>(this.UrlServiceCadastroUsuarioMonolito + "obterPorId/" + id, super.ObterHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    cadastrarUsuario(email: string): Observable<HttpApiResponse<any>> {
        return this.http.post<HttpApiResponse<any>>(`${this.UrlServiceCadastroUsuarioMonolito}cadastrar`,{email}, super.ObterHeaderJson());
    }

    atualizarUsuario(usuario: DadosUsuario): Observable<HttpApiResponse<any>> {
        let id = usuario.id;
        let nome = usuario.nome;
        let email = usuario.email;
        let data_nascimento = usuario.dataNascimento;
        let profissao = usuario.profissao;
        let experiencia = usuario.experiencia;
        let cursos = usuario.cursos;
        return this.http.put<HttpApiResponse<any>>(`${this.UrlServiceCadastroUsuarioMonolito}atualizar/${id}`,{usuario,nome,email,data_nascimento,profissao,experiencia,cursos}, super.ObterHeaderJson());
    }
}