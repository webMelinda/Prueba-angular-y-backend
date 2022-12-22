import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Experiencia } from 'src/app/entidades/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnInit {
  form: FormGroup;
  institucion: string='';
  puesto: string= '';
  periodo: string= '';
  logo: string= '';

  constructor(private formBuilder: FormBuilder, private sExperiencia: ExperienciaService) { 
    this.form= this.formBuilder.group({
      empresa:['',[Validators.required]],
      periodo:['', [Validators.required]],
    })
  }
  

  ngOnInit() {}

  get Empresa(){
    return this.form.get("empresa");
  }
 
  get Periodo(){
   return this.form.get("periodo");
  }

  get EmpresaValid(){
    return this.Empresa?.touched && !this.Empresa?.valid;
  }

  get PeriodoValid() {
    return this.Periodo?.touched && !this.Periodo?.valid;
  }

  onEnviar(event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 
 
    if (this.form.valid){
      // Llamamos a nuestro servicio para enviar los datos al servidor
      // También podríamos ejecutar alguna lógica extra
      this.onCreate();
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template     
      alert("Falló la carga de datos")
      this.form.markAllAsTouched(); 
    }
 
  }
  onCreate(): void{
    const expe = new Experiencia(this.institucion, this.puesto, this.periodo, this.logo);
      this.sExperiencia.agregarExperiencia(expe).subscribe(data=>{alert("Experiencia añadida")
       window.location.reload();
    }, err =>{
      alert("Falló la carga de datos, intente nuevamente");
      window.location.reload();
    });
  }

  limpiar(): void{
    this.form.reset();
  }
}
