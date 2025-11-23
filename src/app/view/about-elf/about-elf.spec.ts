import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutElf } from './about-elf';

describe('AboutElf', () => {
  let component: AboutElf;
  let fixture: ComponentFixture<AboutElf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutElf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutElf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
