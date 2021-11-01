import { Component, OnInit } from '@angular/core';
import { Nav } from 'src/app/Telas/Models/Nav';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})
export class MenuUsuarioComponent implements OnInit {

  isCollapsed = true;

  nav: Nav[] = [
    {
      link: '/usuario/home',
      name: 'Home',
      exact: true,
      admin: false
    },
    {
      link: '/usuario/vagas-usuario',
      name: 'Vagas',
      exact: false,
      admin: false
    },
    {
      link: '/usuario/top-20',
      name: 'TOP 20',
      exact: false,
      admin: false
    },
    {
      link: '/usuario/areas-mais',
      name: 'Areas +',
      exact: true,
      admin: false
    },
    {
      link: '/usuario/cadastro-usuario',
      name: 'Cadastro',
      exact: true,
      admin: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
