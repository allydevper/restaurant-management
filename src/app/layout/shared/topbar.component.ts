import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-topbar',
    imports: [CommonModule, MenubarModule, AvatarModule, InputTextModule, ButtonModule],
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  welcomeMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.welcomeMessage = 'Bienvenido ' + this.authService.currentUserValue?.username;
  }

  logout() {
    this.authService.clearUser();
    this.router.navigate(['/login']);
  }
}
