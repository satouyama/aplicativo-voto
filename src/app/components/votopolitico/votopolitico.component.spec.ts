import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotopoliticoComponent } from './votopolitico.component';

describe('VotopoliticoComponent', () => {
  let component: VotopoliticoComponent;
  let fixture: ComponentFixture<VotopoliticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotopoliticoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotopoliticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
