import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Vehicle, VehicleRepository } from 'src/app/repository/vehicle.repository';

@Component({
  selector: 'app-form-vehicles',
  templateUrl: './form-vehicles.component.html',
  styleUrls: ['./form-vehicles.component.scss']
})
export class FormVehiclesComponent {
  @Input() set display(value: boolean){
      this._display = value;

    if(this.vehicleRepository.getActiveId()){
      const values : Vehicle = this.vehicleRepository.getActiveId();  
      this.vehicleForm.patchValue({
        id: values.id,
        make: values.make,
        model: values.model,
        trany: values.trany
      });
    } else {
      this.vehicleForm.reset();
    }
  }

  @Output() eventOutput = new EventEmitter;
  _display: boolean = false;
  
  vehicleForm: FormGroup;

  constructor(private vehicleRepository: VehicleRepository,
              private fb: FormBuilder){   
    this.vehicleForm = this.fb.group({
      id: [''],
      make: [''],
      model: [''],
      trany: ['']
    }); 
    this.vehicleRepository.fetchCollection();    
  }
  
  close(): void{
    this._display = false;
    this.eventOutput.emit();
  }

  save(): void{
    if(this.vehicleRepository.getActiveId()) this.vehicleRepository.update(this.vehicleForm.value);  
    else this.vehicleRepository.add(this.vehicleForm.value);
    this.close();
  }
}
