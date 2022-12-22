import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/entidades/experiencia';
//import { DatosService } from 'src/app/servicios/datos.service';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experiencias: Experiencia[]=[];
  constructor(private sExperiencia: ExperienciaService) { }

  ngOnInit(): void {
    this.cargarExperiencia();
  }
cargarExperiencia():void{
  
  this.sExperiencia.verExperiencias().subscribe(data => {this.experiencias=data});
  console.log(this.experiencias)
}
}
