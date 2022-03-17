import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { mockProducts } from 'src/app/models/product.mock';
import { ProductService } from 'src/app/services/product.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [CommonModule, HttpClientTestingModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance; // DashboardComponent test instance
    productService = TestBed.inject(ProductService);
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe('should manage products', () => {
    it('should retrieve products onInit', () => {
      const serviceSpy = spyOn(productService, 'getProducts').and.returnValue(
        of(mockProducts)
      );

      expect(component.products.length).toBe(0);
      fixture.detectChanges();

      expect(serviceSpy).toHaveBeenCalled();
      expect(component.products.length).toBe(mockProducts.length);
      expect(component.products[0].constructor.name).toBe('Product');
    });

    it('should draw as many product cards as it retrieve', () => {
      spyOn(productService, 'getProducts').and.returnValue(of(mockProducts));
      fixture.detectChanges();
      const cards = fixture.debugElement.queryAll(By.css('.product-card'));
      expect(component.products.length).toBe(cards.length);
    });
  });
  describe('Product simulation', () => {
    it('should be accessible through the template', () => {
      // is it a good idea to call the function?
      const spySimulation = spyOn(component, 'simulation').and.callThrough();
      // Not really, as we just want to check that it can be accessed.

      spyOn(productService, 'getProducts').and.returnValue(of(mockProducts));
      fixture.detectChanges();

      const btn = fixture.debugElement.query(By.css('.btn-primary'));
      btn.nativeElement.click();

      expect(spySimulation).toHaveBeenCalled();
    });

    // TODO: complete functional test

  });
});
