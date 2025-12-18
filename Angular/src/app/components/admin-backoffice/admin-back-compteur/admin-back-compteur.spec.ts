import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBackCompteur } from './admin-back-compteur';

describe('AdminBackCompteur', () => {
  let component: AdminBackCompteur;
  let fixture: ComponentFixture<AdminBackCompteur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBackCompteur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBackCompteur);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
