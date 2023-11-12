import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVehiclesComponent } from './form-vehicles.component';

describe('FormVehiclesComponent', () => {
  let component: FormVehiclesComponent;
  let fixture: ComponentFixture<FormVehiclesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormVehiclesComponent]
    });
    fixture = TestBed.createComponent(FormVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
