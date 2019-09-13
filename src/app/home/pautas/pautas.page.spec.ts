import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PautasPage } from './pautas.page';

describe('PautasPage', () => {
  let component: PautasPage;
  let fixture: ComponentFixture<PautasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PautasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PautasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
