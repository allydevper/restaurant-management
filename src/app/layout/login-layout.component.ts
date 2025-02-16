import { Component } from '@angular/core';
import { LoginComponent } from '../users/login/login.component';

@Component({
    selector: 'app-login-layout',
    imports: [LoginComponent],
    templateUrl: './login-layout.component.html',
    styleUrl: './login-layout.component.scss'
})
export class LoginLayoutComponent {

}
