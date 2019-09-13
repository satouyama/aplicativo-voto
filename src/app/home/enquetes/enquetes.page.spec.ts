import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquetesPage } from './enquetes.page';

describe('EnquetesPage', () => {
  let component: EnquetesPage;
  let fixture: ComponentFixture<EnquetesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquetesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquetesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
