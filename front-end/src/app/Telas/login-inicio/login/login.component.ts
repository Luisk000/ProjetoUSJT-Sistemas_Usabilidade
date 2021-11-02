import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/Validacao/generic-form-validator';
import { fromEvent, merge, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRegistro } from '../Model-Login/loginRegistro';
import { CustomValidators } from 'ng2-validation';
import { LocalStorageUtils } from 'src/app/Validacao/localStorage';
import { DadosUsuario } from '../../usuario/models/vagasUsuario';
import { UsuarioService } from 'src/app/Services/usuario-service';
import { DadosAdmin } from '../../admin/models/vagasModel';
import { AdminService } from 'src/app/Telas/admin/services/admin-service';
import { LoginAdminService } from 'src/app/Services/login-admin';
import { Autenticacao } from 'src/app/Models/http-api-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  public tipoUser: number;
  public localStorage: LocalStorageUtils = new LocalStorageUtils();

  @ViewChildren(FormControlName, {read: ElementRef}) forInputElements: ElementRef[];
  
  loginForm: FormGroup;

  public loginRegistro: LoginRegistro;  
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  public dadosUsuario: DadosUsuario;
  public dadosAdmin: DadosAdmin = new DadosAdmin();
  public autenticacaoAdmin: Autenticacao;

  constructor(private fb: FormBuilder,    
    private router: Router,
    private route: ActivatedRoute,
    private vagasUsuarioService: UsuarioService,
    private vagasAdminService: AdminService,
    private loginAdminService: LoginAdminService
    ) {    

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      senha: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);    
  }

  ngOnInit(): void {   

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      senha: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]]      
    });

    this.route.params
    .subscribe(params => {      
      this.tipoUser = params['id'];
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.forInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.loginForm);
    });
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.loginRegistro = Object.assign({}, this.loginRegistro, this.loginForm.value);
      //if (this.tipoUser == 2) this.obterUsuarioPorEmail(this.loginRegistro.email);
      if (this.tipoUser == 1) this.loginAdmin(this.loginRegistro.email, this.loginRegistro.senha);
    }
  }

  irDashboard(){
    if (this.tipoUser == 1) this.administrador();
    else this.usuario();
  }

  administrador(){
    this.router.navigate(['admin/home']);
  }

  usuario(){
    this.router.navigate(['usuario/home']);
  }

  registrar(){
    this.router.navigate([`registro/${this.tipoUser}`]);
  }

  salvarLocalStorageUsuario(){
    this.localStorage.salvarUsuario(JSON.stringify(this.dadosUsuario));
  }

  salvarLocalStorageAdmin(){
    this.localStorage.salvarDadosLocaisAdmin(this.autenticacaoAdmin.token, JSON.stringify(this.dadosAdmin));
  }

  voltarSelecao(){
    this.router.navigate(['/']);
  }

  public loginAdmin(email: string, senha: string){    
    this.loginAdminService.loginAdmin(email, senha)    
      .subscribe(response => {
        if (response){          
          this.autenticacaoAdmin = response;
          this.dadosAdmin.id = this.autenticacaoAdmin.dados.userId;
          this.dadosAdmin.email = this.autenticacaoAdmin.dados.email;
          this.salvarLocalStorageAdmin();
          this.irDashboard();
        }
      })
  }
}
