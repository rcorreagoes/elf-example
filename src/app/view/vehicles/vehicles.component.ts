import { Component } from '@angular/core';
import { VehicleRepository } from 'src/app/repository/vehicle.repository';
import { Align, TableFields, Types, buttonDelete, buttonUpdate } from '../table/table.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
  resultData: any[] = [];
  display: boolean = false;

  colTable: TableFields[] = [
    { field: 'make', header: 'Make', width: '35%', filter: true, align: Align.LEFT, type: Types.ORIGINALTEXT },
    { field: 'model', header: 'Model', width: '35%', filter: true, align: Align.LEFT, type: Types.ORIGINALTEXT },
    { field: 'trany', header: 'Trany', width: '20%', filter: true, align: Align.LEFT, type: Types.CURRENCY },
    { field: '', header:'', width: '10%', align: Align.RIGHT, type: Types.BUTTON, buttonValues: [buttonUpdate, buttonDelete]}
  ]
  constructor(public vehicleRepository: VehicleRepository){    
    this.vehicleRepository.fetchCollection();    
    this.vehicleRepository.getAll().subscribe(result=> {
      this.resultData = result.sort((a, b) => {
        const makeA = a.make.toUpperCase();
        const makeB = b.make.toUpperCase();      
        return makeA > makeB ? 1 : makeA < makeB ? -1 : 0;
      });
    });
  }

  onClick(event: any){
    console.log(event)

    if(event.type==="remove") this.delete(event.item.id); 
    if(event.type==="update") this.update(event.item.id); 
  }

  delete(id: number){
    this.vehicleRepository.delete(id);
  }

  new(){
    this.vehicleRepository.removeActive();
    this.display = true;
  }

  update(id: number){
    this.vehicleRepository.setActiveId(id);
    this.display = true;
  }
}
