import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllBillsComponent } from './view-all-bills.component';

describe('ViewAllBillsComponent', () => {
  let component: ViewAllBillsComponent;
  let fixture: ComponentFixture<ViewAllBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllBillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAllBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
