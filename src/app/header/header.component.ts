import { Component, HostListener, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  perfil:any
  public getScreenWidth: any;
  public getScreenHeight: any;
  public desired_columns: any;


  constructor(private router:Router) { }

  ngOnInit(): void {
    this.perfil  = localStorage.getItem('perfil')
    this.onWindowResize();
  }

  CerrarSesion(){
    localStorage.clear()
    this.router.navigate(['login'])
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
