import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  perfil:any
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.perfil  = localStorage.getItem('perfil')
    
  }

  CerrarSesion(){
    localStorage.clear()
    this.router.navigate(['login'])
  }

}
