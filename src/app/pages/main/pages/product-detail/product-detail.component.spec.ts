import { CommonModule, Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { mockProducts } from 'src/app/models/product.mock';
import { ProductService } from 'src/app/services/product.service';
import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  let route: ActivatedRoute;
  let productService: ProductService;
  let location: Location;

  /**
   // alternativa 'sucia' cuando la inyección de dependencia se atasca
  let backMock = false;

   */

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
      ],
    });

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance; // DashboardComponent test instance
    productService = TestBed.inject(ProductService);
    route = TestBed.inject(ActivatedRoute);
    location = TestBed.inject(Location);
    // alternativa 'sucia'
    // component['location'] = {back: () => { backMock = true; }}
  });
  /*
  //alternativa 'sucia'
  afterEach(()=>{
    backMock = false;
  });
  */

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should get product info on init', () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('11');
    spyOn(productService, 'getProduct').and.returnValue(of(mockProducts[0]));

    expect(component.product).toBeUndefined();

    fixture.detectChanges();

    expect(component.product).toBeDefined();
    expect(component.product.id).toBe(11);
  });

  it('should get empty product info if param id is empty', () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue(null);
    const spyProductService = spyOn(
      productService,
      'getProduct'
    ).and.returnValue(of({} as Product));

    fixture.detectChanges();

    expect(spyProductService).toHaveBeenCalledWith(0);
  });

  it('should go back if press goBack button', () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('11');
    spyOn(productService, 'getProduct').and.returnValue(of(mockProducts[0]));
    const spyLocation = spyOn(location, 'back');

    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('.btn-dark'));
    btn.nativeElement.click();

    fixture.detectChanges();
    expect(spyLocation).toHaveBeenCalled();
    // alternativa 'sucia'
    // expect(backMock).toBeTrue()
  });

  it('should update product changes when press Save button', () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('11');
    spyOn(productService, 'getProduct').and.returnValue(of(mockProducts[0]));
    spyOn(productService, 'updateProduct').and.returnValue(of());

    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('#quality'));
    const btn = fixture.debugElement.query(By.css('.btn-primary'));

    input.nativeElement.value = 30;
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    btn.nativeElement.click();

    expect(component.product.quality).toBe(30);
    expect(productService.updateProduct).toHaveBeenCalled();
  });

  it('should go back after update product', () => {
    spyOn(productService, 'updateProduct').and.returnValue(of({}));
    const spyGoBack = spyOn(location, 'back');

    component.product = mockProducts[0];
    component.product.quality = 22;

    component.save();
    expect(productService.updateProduct).toHaveBeenCalled();
    expect(spyGoBack).toHaveBeenCalled();
  });
});
