import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/Validacao/generic-form-validator';
import { fromEvent, merge, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRegistro } from '../Model-Login/loginRegistro';
import { CustomValidators } from 'ng2-validation';
import { DadosUsuario } from '../../usuario/models/vagasUsuario';
import { UsuarioService } from 'src/app/Services/usuario-service';
import { LocalStorageUtils } from 'src/app/Validacao/localStorage';
import { AdminService } from 'src/app/Services/admin-service';
import { DadosAdmin } from '../../admin/models/vagasModel';

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
  public dadosUsuario: DadosUsuario;
  public dadosAdmin: DadosAdmin;  

  constructor(private fb: FormBuilder,    
    private router: Router,
    private route: ActivatedRoute,
    private vagasUsuarioService : UsuarioService,
    private vagasAdminService: AdminService
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
      if (this.tipoUser == 2) this.obterUsuarioPorEmail(this.loginRegistro.email);
      if (this.tipoUser == 1) this.obterAdminPorEmail(this.loginRegistro.email);
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

  public obterUsuarioPorEmail(email: string){    
    this.vagasUsuarioService.obterUsuarioPorEmail(email)    
      .subscribe(response => {
        if (response){
          this.dadosUsuario = response.data.dados[0];          
          if (response.data.totalRegistros > 0){            
            console.log("Email já cadastrado");            
          }
          else{
            this.cadastrarUsuario(email);
          }                             
        }
      })
  }

  public cadastrarUsuario(email: string){         
    this.vagasUsuarioService.cadastrarUsuario(email)
      .subscribe(response => {
        if (response){
          this.vagasUsuarioService.obterUsuarioPorEmail(email)    
            .subscribe(response => {
              if (response.data.totalRegistros > 0){
                this.dadosUsuario = response.data.dados[0];
                this.salvarLocalStorageUsuario();
                this.irDashboard();
              }
            })     
        }
      })      
  }
  
  public cadastrarAdmin(email: string){         
    this.vagasAdminService.cadastrarAdmin(email)
      .subscribe(response => {
        if (response){
          this.vagasAdminService.obterAdminPorEmail(email)    
            .subscribe(response => {
              if (response.data.totalRegistros > 0){
                this.dadosAdmin = response.data.dados[0];
                this.salvarLocalStorageAdmin();
                this.irDashboard();
              }
            })     
        }
      })      
  }

  public obterAdminPorEmail(email: string){    
    this.vagasAdminService.obterAdminPorEmail(email)    
      .subscribe(response => {
        if (response){
          this.dadosAdmin = response.data.dados[0];          
          if (response.data.totalRegistros > 0){                        
            console.log("Email já cadastrado");            
          }
          else{            
            this.cadastrarAdmin(email);
          }                             
        }
      })
  }

}
