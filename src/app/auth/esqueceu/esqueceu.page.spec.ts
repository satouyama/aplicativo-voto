import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsqueceuPage } from './esqueceu.page';

describe('EsqueceuPage', () => {
  let component: EsqueceuPage;
  let fixture: ComponentFixture<EsqueceuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsqueceuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsqueceuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
