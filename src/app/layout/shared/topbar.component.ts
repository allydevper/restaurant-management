import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, MenubarModule, AvatarModule, InputTextModule, ButtonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  items: MenuItem[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Bienvenido ' + this.authService.currentUserValue?.username,
      }
    ];
  }

  logout() {
    this.authService.clearUser();
    this.router.navigate(['/login']);
  }
}
