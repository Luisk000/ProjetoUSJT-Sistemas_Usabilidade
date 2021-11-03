import { HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from 'src/environments/environment';
import { LocalStorageUtils } from "../Validacao/localStorage";

export abstract class BaseService {

    public localStorage: LocalStorageUtils = new LocalStorageUtils();

    //Microservicos
    protected UrlServiceVagasUsuario: string = environment.apiVagasUsuario;
    protected UrlServiceCadastroUsuario: string = environment.apiCadastroUsuario;
    protected UrlServiceCadastroAdmin: string = environment.apiCadastroAdmin;
    protected UrlServiceVagasAdmin: string = environment.apiVagasAdmin;
    protected UrlServiceAutenticacao: string = environment.apiAutenticacao;

    //Monolito
    protected UrlServiceMonolito: string = environment.apiMonolito;

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected ObterAuthHeaderJsonAdmin() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.localStorage.obterTokenAdmin()}`
            })
        };
    }

    protected ObterAuthHeaderJsonUsuario() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.localStorage.obterTokenUsuario()}`
            })
        };
    }

    protected extractData(response: any) {
        return response.data || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];

        if (response instanceof HttpErrorResponse) {

            if (response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }
        }

        console.error(response);
        return throwError(response);
    }
}
