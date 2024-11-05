import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { EscuelaService } from '../services/escuela.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Escuela } from '../models/escuela';
import { FormsModule } from '@angular/forms';
import { Facultad } from '../models/facultad';
import { FacultadService } from '../services/facultad.service';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-escuela',
  standalone: true,
  imports: [MenuComponent, TableModule, CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule, ConfirmDialogModule, ToastModule, DropdownModule],
  templateUrl: './escuela.component.html',
  styleUrl: './escuela.component.css',
  providers: [EscuelaService, FacultadService, ConfirmationService, MessageService]
})
export class EscuelaComponent {
  escuelas: Escuela[]=[];
  facultades: Facultad[]=[];
  escuela: Escuela = new Escuela();

  titulo: string= '';
  opc: string= '';
  op= 0;
  visible: boolean= false;
  isDeleteInProgress: boolean= false;

  constructor(
    private escuelaService: EscuelaService,
    private facultadService: FacultadService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit():void {
    this.listarEscuelas();
    this.listarNombreFacultad();
  }

  listarEscuelas(){
    this.escuelaService.getEscuelas().subscribe((data: Escuela[]) => {
      this.escuelas = data;
    })
  }

  listarNombreFacultad(){
    this.facultadService.getFacultades().subscribe((data: Facultad[]) => {
      this.facultades = data;
    })
  }

  addEscuelas():void{
    this.escuelaService.createEscuela(this.escuela).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Escuela registrada con exito',
        });
        this.listarEscuelas();
        this.op= 0;
      },
      error: () => {
        this.isDeleteInProgress= false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "No se puedo registrar la Escuela",
        });
      },
    });
    this.visible= false;
  }

  editEscuelas(){
    this.escuela.facultad = this.facultades.find(f => f.id === this.escuela.facultad.id)!;
    this.escuelaService.updateEscuela(this.escuela, this.escuela.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Escuela editada con exito',
        });
        this.listarEscuelas();
        console.log(this.escuela.id + ' ' + this.escuela.nombre + ' ' + this.escuela.facultad.id);
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar la escuela',
        });
      },
    });
    this.visible= false;
  }

  deleteEscuela(id: number){
    this.isDeleteInProgress= true;
    this.escuelaService.deleteEscuela(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Escuela eliminada con exito',
        });
        this.isDeleteInProgress= false;
        this.listarEscuelas();
      },
      error: () => {
        this.isDeleteInProgress= false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la escuela',
        });
      },
    });  
  }

  showDialogCreate(){
    this.titulo= "Añadir nueva Escuela"
    this.opc= "Guardar";
    this.op= 0;
    this.visible= true;
  }

  showDialogEdit(id: number){
    this.titulo= "Editar Escuela"
    this.opc= "Actualizar";
    this.escuelaService.getEscuelaById(id).subscribe((data)=>{
      this.escuela= data;
      this.op= 1;
    });
    this.visible= true;
  }

  showDiaologDelete(event: Event, id: number){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Quieres eliminar esta escuela?',
      header: 'Confirmacion de Eliminacion',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          this.deleteEscuela(id);
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Operacion cancelada' });
      }
    });
  }

  limpiar(){
    this.titulo= '';
    this.opc= '';
    this.op= 0;
    this.escuela.id= 0;
    this.escuela.nombre= '';
    this.escuela= new Escuela();
  }

  opcion(): void{
    if (this.op==0) {
      this.addEscuelas();
      this.limpiar();
    } else if (this.op==1) {
      console.log("Editar");
      this.editEscuelas();
      this.limpiar();
    } else {
      console.log("Vacio");
      this.limpiar();
    }
  }    
}
