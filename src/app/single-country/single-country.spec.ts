import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCountry } from './single-country';

describe('SingleCountry', () => {
  let component: SingleCountry;
  let fixture: ComponentFixture<SingleCountry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCountry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCountry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
