import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciativasPage } from './iniciativas.page';

describe('IniciativasPage', () => {
  let component: IniciativasPage;
  let fixture: ComponentFixture<IniciativasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciativasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciativasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
