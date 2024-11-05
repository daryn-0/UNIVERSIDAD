import { Component, OnInit } from '@angular/core';
import { FacultadService } from '../services/facultad.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Facultad } from '../models/facultad';
import { MenuComponent } from '../menu/menu.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-facultad',
  standalone: true,
  imports: [MenuComponent, TableModule, CommonModule, CardModule],
  templateUrl: './facultad.component.html',
  styleUrls: ['./facultad.component.css'],
  providers: [FacultadService]
})
export class FacultadComponent {
  facultades: Facultad[]=[];

  constructor(private facultadService: FacultadService) {}

  ngOnInit():void {
      this.listarCategorias();
  }

  listarCategorias() {
    this.facultadService.getFacultades().subscribe((data: Facultad[]) => {
        this.facultades = data;
    });
}

}
