import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitedCellComponent } from './visited-cell.component';

describe('VisitedCellComponent', () => {
  let component: VisitedCellComponent;
  let fixture: ComponentFixture<VisitedCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitedCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitedCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
