import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Actions } from '@ngneat/effects-ng';
import { devTools } from '@ngneat/elf-devtools';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AppComponent } from './app.component';
import { VehicleService } from './service/vehicle.service';
import { TableComponent } from './view/table/table.component';
import { FormVehiclesComponent } from './view/vehicles/form-vehicles/form-vehicles.component';
import { VehiclesComponent } from './view/vehicles/vehicles.component';

export function initElfDevTools(actions: Actions) {
	return () => {
		devTools({
      name: 'Sample Application',
      actionsDispatcher: actions
		})
	};
}

@NgModule({
  imports: [BrowserAnimationsModule, BrowserModule, ButtonModule, CardModule, DialogModule, FormsModule, 
            HttpClientModule, InputTextModule, ReactiveFormsModule, TableModule],
  declarations: [AppComponent, FormVehiclesComponent, TableComponent, VehiclesComponent],
  providers: [VehicleService,
    { provide: APP_INITIALIZER, multi: true, useFactory: initElfDevTools, deps: [Actions] }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
