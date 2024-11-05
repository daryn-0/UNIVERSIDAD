import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Inicio',
                icon: 'pi pi-home',
                routerLink: '/'
            },
            {
                label: 'Opciones',
                icon: 'pi pi-search',
                items: [
                    {
                        label: 'Facultad',
                        icon: 'pi pi-star',
                        routerLink: '/facultad'
                    },
                    {
                        label: 'Escuela',
                        icon: 'pi pi-pencil',
                        routerLink: '/escuela'
                    }
                    
                ]
            },
            {
                label: 'Contact',
                icon: 'pi pi-envelope'
            }
        ]
    }
}
