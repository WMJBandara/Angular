import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDepComponent } from './view-dep.component';

describe('ViewDepComponent', () => {
  let component: ViewDepComponent;
  let fixture: ComponentFixture<ViewDepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
