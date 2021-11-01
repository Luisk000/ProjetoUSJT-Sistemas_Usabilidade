import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/Validacao/generic-form-validator';
import { fromEvent, merge, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DadosAdmin } from '../models/vagasModel';
import { LocalStorageUtils } from 'src/app/Validacao/localStorage';
import { VagasAdminService } from '../services/vagasAdminService';
import { AdminService } from 'src/app/Services/admin-service';

@Component({
  selector: 'app-cadastro-admin',
  templateUrl: './cadastro-admin.component.html',
  styleUrls: ['./cadastro-admin.component.css']
})
export class CadastroAdminComponent implements OnInit, AfterViewInit {

  public dadosAdmin: DadosAdmin;
  public admin: DadosAdmin;
  public localStorage: LocalStorageUtils = new LocalStorageUtils();

  @ViewChildren(FormControlName, {read: ElementRef}) forInputElements: ElementRef[];

  cadastroForm: FormGroup;
  
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder, 
    private router: Router,
    private adminService: AdminService
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
      empresa: {
        required: 'A empresa é requerida',
        minlength: 'A empresa precisa ter no mínimo 2 caracteres',
        maxlength: 'A empresa precisa ter no máximo 150 caracteres'
      },
      cargo: {
        required: 'O cargo é requerido',
        minlength: 'O cargo precisa ter no mínimo 2 caracteres',
        maxlength: 'O cargo precisa ter no máximo 150 caracteres'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email]],
      empresa: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      cargo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]]
    });

    this.dadosAdmin = JSON.parse(this.localStorage.obterAdmin());
    this.obterAdminPorId(this.dadosAdmin.id)
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.forInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });
  }

  preencherForm(admin: DadosAdmin) {
    this.cadastroForm.patchValue({
      nome: admin.nome,
      email: admin.email,
      empresa: admin.empresa,
      cargo: admin.cargo
    });
  }

  public obterAdminPorId(id: string){
    this.adminService.obterPorId(id)    
      .subscribe(response => {
        if (response){
          this.dadosAdmin = response.data.dados[0];          
          if (response.data.totalRegistros > 0){            
            this.preencherForm(this.dadosAdmin);                        
          }
          else{            
            console.log("Erro ao cadastrar usuario");
          }                             
        }
      })
  }

  atualizarDadosAdmin(){
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
      this.admin = Object.assign({}, this.dadosAdmin, this.cadastroForm.value);
      this.admin.id = this.dadosAdmin.id;
      this.atualizarAdmin(this.admin);
    }
  }

  public atualizarAdmin(admin: DadosAdmin){
    this.adminService.atualizarAdmin(admin)    
      .subscribe(response => {
        if (response){
          document.location.reload();
        }        
      })
  }

  voltarDashboard(){
    this.router.navigate(['admin/home']);
  }

}
