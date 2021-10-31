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

  constructor(private fb: FormBuilder,    
    private router: Router,
    private route: ActivatedRoute,
    private vagasUsuarioService : UsuarioService
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
      if (this.tipoUser == 2) this.obterUsuarioPorEmail(this.loginRegistro.email);
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

  salvarLocalStorage(){
    this.localStorage.salvarUsuario(JSON.stringify(this.dadosUsuario));
  }

  voltarSelecao(){
    this.router.navigate(['/']);
  }

  public obterUsuarioPorEmail(email: string){    
    this.vagasUsuarioService.obterUsuarioPorEmail(email)    
      .subscribe(response => {
        if (response){
          this.dadosUsuario = response.data.dados;          
          if (JSON.stringify(this.dadosUsuario) !== '[]'){
            this.salvarLocalStorage();
            this.irDashboard();            
          }
          else{            
            console.log("Usuario não cadastrado");
          }                             
        }
      })
  }
}
