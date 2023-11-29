import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  perfil: any;
  user: any;
  selectedMenu: string = '';
  public getScreenWidth: any;
  public getScreenHeight: any;
  public desired_columns: any;
  public menuItems: any[] = [];
  public mainMenu: any;
  public main: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.perfil = localStorage.getItem('perfil');
    this.user = localStorage.getItem('user');
    const storedMenu = localStorage.getItem('menu');
    this.main = storedMenu ? JSON.parse(storedMenu) : [];

    this.processMenuData();
    
    this.onWindowResize();
  }

  processMenuData() {
    const menuPrincipalConSubmenus: any[] = [];

    for (const row of this.main) {
      if (row.submenu) {
        let menuPrincipalExistente = menuPrincipalConSubmenus.find(
          (item) => item.menu_principal === row.menu_principal
        );

        if (!menuPrincipalExistente) {
          menuPrincipalExistente = {
            menu_principal: row.menu_principal,
            id_principal: row.id_principal,
            route_principal: row.route_principal,
            submenus: [],
          };
          menuPrincipalConSubmenus.push(menuPrincipalExistente);
        }

        menuPrincipalExistente.submenus.push({
          submenu: row.submenu,
          id_submenu: row.id_submenu,
          route_submenu: row.route_submenu,
        });
      } else {
        menuPrincipalConSubmenus.push({
          menu_principal: row.menu_principal,
          id_principal: row.id_principal,
          route_principal: row.route_principal,
          submenus: [],
        });
      }
    }

    this.menuItems = menuPrincipalConSubmenus;
    
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }

  CerrarSesion() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    if (this.getScreenWidth < 767) {
      this.desired_columns = 0;
    } else {
      this.desired_columns = 1;
    }
  }
}
