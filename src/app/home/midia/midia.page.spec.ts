import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidiaPage } from './midia.page';

describe('MidiaPage', () => {
  let component: MidiaPage;
  let fixture: ComponentFixture<MidiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidiaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
