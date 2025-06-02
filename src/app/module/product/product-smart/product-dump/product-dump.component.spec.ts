import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDumpComponent } from './product-dump.component';

describe('ProductDumpComponent', () => {
  let component: ProductDumpComponent;
  let fixture: ComponentFixture<ProductDumpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDumpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
