import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/sidebar.component';
import { TopbarComponent } from './shared/topbar.component';

@Component({
    selector: 'app-main-layout',
    imports: [RouterOutlet, SidebarComponent, TopbarComponent],
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
