import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxselectComponent } from './boxselect.component';

describe('BoxselectComponent', () => {
  let component: BoxselectComponent;
  let fixture: ComponentFixture<BoxselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
