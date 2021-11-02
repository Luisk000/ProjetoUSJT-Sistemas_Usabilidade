import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Observable, fromEvent, merge } from 'rxjs';
import { UsuarioService } from 'src/app/Telas/usuario/services/usuario-service';
import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/Validacao/generic-form-validator';
import { LocalStorageUtils } from 'src/app/Validacao/localStorage';
import { DadosUsuario } from '../models/vagasUsuario';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  @ViewChildren(FormControlName, {read: ElementRef}) forInputElements: ElementRef[];

  cadastroForm: FormGroup;
  
  public localStorage: LocalStorageUtils = new LocalStorageUtils();
  public user: DadosUsuario;
  public dadosUsuario: DadosUsuario;
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder, 
    private router: Router,
    private vagasUsuarioService : UsuarioService    
    ) {
      
    this.validationMessages = {
      nome: {
        required: 'O nome é requerido',
        minlength: 'O nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O nome precisa ter no máximo 150 caracteres'
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      dataNascimento: {
        required: 'A data de nascimento é requerida',
        date: 'Data de nascimento em formato inválido',
        minlength: 'Data de nascimento em formato inválido',
        maxlength: 'Data de nascimento em formato inválido'
      },
      profissao: {
        required: 'O profissao é requerido',
        minlength: 'O profissao precisa ter no mínimo 2 caracteres',
        maxlength: 'O profissao precisa ter no máximo 150 caracteres'
      },
      experiencia: { },
      cursos: { }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

    let nascimento = new FormControl('', [Validators.required, Validators.minLength(10), 
      Validators.maxLength(10), CustomValidators.date]);

    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: nascimento,
      profissao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      experiencia: ['', [Validators.maxLength(500)]],
      cursos: ['', [Validators.maxLength(300)]]
    });
    this.dadosUsuario = this.dadosUsuario = JSON.parse(JSON.stringify(this.localStorage.obterUsuario()));    
    this.obterUsuarioPorId(this.dadosUsuario.id)
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.forInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });
  }

  preencherForm(usuario: DadosUsuario) {
    this.cadastroForm.patchValue({
      nome: usuario.nome,
      email: usuario.email,
      dataNascimento: usuario.dataNascimento,
      profissao: usuario.profissao,
      experiencia: usuario.experiencia,
      cursos: usuario.cursos,
    });
  }

  atualizarDadosUsuario(){
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
      this.user = Object.assign({}, this.user, this.cadastroForm.value);
      this.user.id = this.dadosUsuario.id;
      this.user.dataNascimento = this.formatarDataNascimento(this.user.dataNascimento)
      this.atualizarUsuario(this.user);
    }
  }

  formatarDataNascimento(data: string): string{
    let dia = parseInt(data.substring(0,2));
    let mes = parseInt(data.substring(3,5));
    let ano = parseInt(data.substring(6,10));
    return ano + "-" + mes + "-" + dia;
  }

  voltarDashboard(){
    this.router.navigate(['usuario/home']);
  }

  salvarLocalStorage(){
    this.localStorage.salvarUsuario(JSON.stringify(this.dadosUsuario));
  }

  public obterUsuarioPorId(id: string){
    this.vagasUsuarioService.obterPorId(id)    
      .subscribe(response => {
        if (response){
          this.dadosUsuario = response.data.dados[0];          
          if (JSON.stringify(this.dadosUsuario) !== '[]'){
            this.dadosUsuario.dataNascimento = this.converterDataNascimento(this.dadosUsuario.dataNascimento);
            this.preencherForm(this.dadosUsuario);                        
          }
          else{            
            console.log("Erro ao cadastrar usuario");
          }                             
        }
      })
  }

  public atualizarUsuario(usuario: DadosUsuario){
    this.vagasUsuarioService.atualizarUsuario(usuario)    
      .subscribe(response => {
        if (response){
          document.location.reload();
        }        
      })
  }

  public converterDataNascimento(data: string): string{
    var datePipe = new DatePipe('pt-br');
    return datePipe.transform(data, 'dd/MM/yyyy');
  }
}
