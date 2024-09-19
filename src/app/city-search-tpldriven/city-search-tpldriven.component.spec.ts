import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySearchTpldrivenComponent } from './city-search-tpldriven.component';

describe('CitySearchTpldrivenComponent', () => {
  let component: CitySearchTpldrivenComponent;
  let fixture: ComponentFixture<CitySearchTpldrivenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitySearchTpldrivenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitySearchTpldrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
