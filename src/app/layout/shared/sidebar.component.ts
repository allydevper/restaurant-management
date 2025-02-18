import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    imports: [RouterModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    isCollapsed = false;

    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
    }
}
