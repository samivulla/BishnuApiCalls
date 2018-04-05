import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameCellComponent } from './name-cell.component';

describe('NameCellComponent', () => {
  let component: NameCellComponent;
  let fixture: ComponentFixture<NameCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
