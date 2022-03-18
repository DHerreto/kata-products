import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product, ProductType } from 'src/app/models/product';
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

  describe('should retrieve products', () => {
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

    it("should degrade Q to twice the speed once R is reached", () => {
      const mockProduct = new Product(11, 'Pan', 0, 10, ProductType.perishable);
      component.products = [mockProduct];

      component.simulation();
      expect(component.products[0].quality).toBe(8);

      component.simulation();
      expect(component.products[0].quality).toBe(6);

    });

    it('should downgrade Q to 1 if it has not yet reached R', () => {
      const mockProduct = new Product(11, 'Pan', 10, 10, ProductType.perishable);
      component.products = [mockProduct];

      component.simulation();
      expect(component.products[0].quality).toBe(9);

      component.simulation();
      expect(component.products[0].quality).toBe(8);
    });

    it('should not set Q less than 0', () => {
      const mockProduct = new Product(11, 'Pan', 0, 1, ProductType.perishable);
      component.products = [mockProduct];

      component.simulation();
      component.simulation();
      component.simulation();
      component.simulation();

      expect(component.products[0].quality).toBe(0);
    });

    describe('Products with type vintage', () => {
      it('should increase Q at 1 if R is up to 0', () => {
        const mockProduct = new Product(11, 'Chess', 10, 1, ProductType.vintage);
        component.products = [mockProduct];

        component.simulation();
        expect(component.products[0].quality).toBe(2);

        component.simulation();
        expect(component.products[0].quality).toBe(3);

      });

      it('should increase Q at 2 if R is down to 0', () => {
        const mockProduct = new Product(11, 'Chess', 0, 1, ProductType.vintage);
        component.products = [mockProduct];

        component.simulation();
        expect(component.products[0].quality).toBe(3);

        component.simulation();
        expect(component.products[0].quality).toBe(5);

      });

      it('should not increase more than 50', () => {
        const mockProduct = new Product(11, 'Chess', -1, 49, ProductType.vintage);
        component.products = [mockProduct];

        component.simulation();
        expect(component.products[0].quality).toBe(50);
      });

    });

    it('should not change R or Q if product type is immutable', () => {
      const mockProduct = new Product(11, 'Salt', 1, 80, ProductType.immutable);
      component.products = [mockProduct];

      component.simulation();
      expect(component.products[0].quality).toBe(80);
      expect(component.products[0].sellIn).toBe(1);

      const mockProduct2 = new Product(11, 'Salt', -1, 5, ProductType.immutable);
      component.products = [mockProduct2];
      component.simulation();
      expect(component.products[0].quality).toBe(5);
      expect(component.products[0].sellIn).toBe(-1);
    })

    describe('Products with type cured', () => {
      it('should increased Q by 2 if there are 10 days or less to R', () => {
        const mockProduct = new Product(11, 'Ham', 9, 10, ProductType.cured);
        component.products = [mockProduct];

        component.simulation();
        expect(component.products[0].quality).toBe(12);
        component.simulation();
        expect(component.products[0].quality).toBe(14);
      });
      it('should increased Q by 3 if there are 5 days or less to R', () => {
        const mockProduct = new Product(11, 'Ham', 5, 10, ProductType.cured);
        component.products = [mockProduct];

        component.simulation();
        expect(component.products[0].quality).toBe(13);
        component.simulation();
        expect(component.products[0].quality).toBe(16);
      });
      it('should downgrade Q to 0 if there are 0 days or less to R', () => {
        const mockProduct = new Product(11, 'Ham', 0, 10, ProductType.cured);
        component.products = [mockProduct];

        component.simulation(); // sellIn -1
        expect(component.products[0].quality).toBe(0);
        component.simulation(); // sellIn -2
        expect(component.products[0].quality).toBe(0);
      });
      it('should icreased Q by 1 if there are 10 days or more', () => {
        const mockProduct = new Product(11, 'Ham', 12, 10, ProductType.cured);
        component.products = [mockProduct];

        component.simulation(); // sellIn 11
        expect(component.products[0].quality).toBe(11);
        component.simulation(); // SellIn 10
        expect(component.products[0].quality).toBe(12);
      });
    });

  });
});
