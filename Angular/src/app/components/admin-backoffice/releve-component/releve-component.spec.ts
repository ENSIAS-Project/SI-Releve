import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleveComponent } from './releve-component';

describe('ReleveComponenet', () => {
  let component: ReleveComponent;
  let fixture: ComponentFixture<ReleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleveComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
