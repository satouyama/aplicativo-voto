import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestaquesPage } from './destaques.page';

describe('DestaquesPage', () => {
  let component: DestaquesPage;
  let fixture: ComponentFixture<DestaquesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestaquesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestaquesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
