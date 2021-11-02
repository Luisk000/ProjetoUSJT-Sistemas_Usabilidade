import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/Validacao/generic-form-validator';
import { fromEvent, merge, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRegistro } from '../Model-Login/loginRegistro';
import { CustomValidators } from 'ng2-validation';
import { DadosUsuario } from '../../usuario/models/vagasUsuario';
import { LocalStorageUtils } from 'src/app/Validacao/localStorage';
import { DadosAdmin } from '../../admin/models/vagasModel';
import { LoginAdminService } from 'src/app/Services/login-admin';
import { Autenticacao } from 'src/app/Models/http-api-response';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, AfterViewInit {

  public tipoUser: number;
  public localStorage: LocalStorageUtils = new LocalStorageUtils();

  @ViewChildren(FormControlName, {read: ElementRef}) forInputElements: ElementRef[];
  
  registroForm: FormGroup;

  public loginRegistro: LoginRegistro;  
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  public dadosUsuario: DadosUsuario = new DadosUsuario();
  public dadosAdmin: DadosAdmin = new DadosAdmin();
  public autenticacaoAdmin: Autenticacao;  

  constructor(private fb: FormBuilder,    
    private router: Router,
    private route: ActivatedRoute,
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
      },
      confirmarSenha: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);    
  }

  ngOnInit(): void {
    
    let senhaUser = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senhaUser)]);

    this.registroForm = this.fb.group({
      email: ['', [Validators.required]],      
      senha: senhaUser,
      confirmarSenha: senhaConfirm
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
      this.displayMessage = this.genericValidator.processarMensagens(this.registroForm);
    });
  }

  registrar() {
    if (this.registroForm.dirty && this.registroForm.valid) {
      this.loginRegistro = Object.assign({}, this.loginRegistro, this.registroForm.value);
      if (this.tipoUser == 2) this.registroUsuario(this.loginRegistro.email, this.loginRegistro.senha);
      if (this.tipoUser == 1) this.registroAdmin(this.loginRegistro.email, this.loginRegistro.senha);
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

  login(){
    this.router.navigate([`login/${this.tipoUser}`]);
  }

  voltarSelecao(){
    this.router.navigate(['/']);
  }

  salvarLocalStorageUsuario(){
    this.localStorage.salvarUsuario(JSON.stringify(this.dadosUsuario));
  }

  salvarLocalStorageAdmin(){
    this.localStorage.salvarAdmin(JSON.stringify(this.dadosAdmin));
  }

  public registroAdmin(email: string, senha: string){    
    this.loginAdminService.registroAdmin(email, senha)    
      .subscribe(response => {
        if (response){
          this.loginAdmin(email, senha);
        }
      },
      (erro) => {
        console.log(erro.error.message)
      })
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

  public registroUsuario(email: string, senha: string){    
    this.loginAdminService.registroUsuario(email, senha)    
      .subscribe(response => {
        if (response){
          this.loginUsuario(email, senha);
        }
      },
      (erro) => {
        console.log(erro.error.message)
      })
  }

  public loginUsuario(email: string, senha: string){    
    this.loginAdminService.loginUsuario(email, senha)    
      .subscribe(response => {
        if (response){          
          this.autenticacaoAdmin = response;
          this.dadosUsuario.id = this.autenticacaoAdmin.dados.userId;
          this.dadosUsuario.email = this.autenticacaoAdmin.dados.email;
          this.salvarLocalStorageUsuario();
          this.irDashboard();
        }
      })
  }
}
