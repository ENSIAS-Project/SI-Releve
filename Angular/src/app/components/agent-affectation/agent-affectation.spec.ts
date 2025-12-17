import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAffectation } from './agent-affectation';

describe('AgentAffectation', () => {
  let component: AgentAffectation;
  let fixture: ComponentFixture<AgentAffectation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentAffectation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentAffectation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
