import { Injectable } from '@angular/core';
import { createStore, select } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  resetActiveId,
  selectAllEntities,
  selectFirst,
  selectLast,
  setActiveId,
  updateEntities,
  withActiveId,
  withEntities
} from '@ngneat/elf-entities';
import { Observable } from 'rxjs';
import { VehicleService } from '../service/vehicle.service';

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  trany: string;
}

const store = createStore(
  { name: 'vehicles' },
  withEntities<Vehicle>(),
  withActiveId(),
);

export const first$ = store.pipe(selectFirst());
export const last$ = store.pipe(selectLast());

@Injectable({ providedIn: 'root' })
export class VehicleRepository {

  constructor(private readonly vehicleService: VehicleService){}

  vehicles$ = store.pipe(selectAllEntities());

  add(vehicle: Vehicle) {
    let id: number = 1
    store.pipe(selectLast()).subscribe(result=>{
      if(!result) return;
      id = result.id + 1;
    }).unsubscribe();

    store.update(addEntities({ id: id + 1, make: vehicle.make, model: vehicle.model, trany: vehicle.trany }));
  }

  delete(id: number) {
    store.update(deleteEntities(id));
  }

  fetchCollection() {
    this.vehicleService.getVehicleData().subscribe({
      next: (result: { results: Vehicle[] }) => {
        store.destroy();
        const transformedResults = result.results.map((o, index) => ({
          id: index + 1,
          make: o.make,
          model: o.model,
          trany: o.trany
        }));
  
        store.update(addEntities(transformedResults));
      }
    });
  }
  
  getActiveId(): Vehicle{
    return store.getValue().entities[store.getValue().activeId];
  }

  getAll(): Observable<Vehicle[]> {
    return store.pipe(select((state) => Object.values(state.entities)));
  }

  removeActive(){
    store.update(resetActiveId());
  }

  setActiveId(id: number){
    store.update(setActiveId(id));
  }
  
  update(vehicle: Vehicle) {
    store.update(
      updateEntities(vehicle.id, (entity) => ({
        ...entity,
        make: vehicle.make,
        model: vehicle.model,
        trany: vehicle.trany
      }))
    );
  }
}
