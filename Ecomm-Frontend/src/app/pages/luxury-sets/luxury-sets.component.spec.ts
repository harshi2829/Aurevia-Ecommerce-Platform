import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxurySetsComponent } from './luxury-sets.component';

describe('LuxurySetsComponent', () => {
  let component: LuxurySetsComponent;
  let fixture: ComponentFixture<LuxurySetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuxurySetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LuxurySetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
