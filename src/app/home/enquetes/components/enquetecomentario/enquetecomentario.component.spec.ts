import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquetecomentarioComponent } from './enquetecomentario.component';

describe('EnquetecomentarioComponent', () => {
  let component: EnquetecomentarioComponent;
  let fixture: ComponentFixture<EnquetecomentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquetecomentarioComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquetecomentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
