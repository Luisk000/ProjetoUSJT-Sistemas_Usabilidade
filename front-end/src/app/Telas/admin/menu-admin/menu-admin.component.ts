import { Component, OnInit } from '@angular/core';
import { Nav } from 'src/app/Telas/Models/Nav';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  isCollapsed = true;

  nav: Nav[] = [
    {
      link: '/admin/home',
      name: 'Home',
      exact: true,
      admin: false
    },
    {
      link: '/admin/vagas',
      name: 'Vagas',
      exact: false,
      admin: false
    },
    {
      link: '/admin/cadastro',
      name: 'Cadastro',
      exact: true,
      admin: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
