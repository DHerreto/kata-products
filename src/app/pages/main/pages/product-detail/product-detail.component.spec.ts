import { CommonModule, Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { mockProducts } from 'src/app/models/product.mock';
import { ProductService } from 'src/app/services/product.service';
import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  let route: ActivatedRoute;
  let productService: ProductService;
  /*const mockedLocation:any = jasmine.createSpyObj<Location>('Location', ['back']);
  mockedLocation.back.and.returnValue();*/
  let mockLocationBack: boolean = false;
  const mockedLocation = {
    back: () => {
      mockLocationBack = true;
    },
  };

  // let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
      ],
      /* providers: [
       { provider: Location, useValue: mockedLocation }
      ]*/
    });

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance; // DashboardComponent test instance
    productService = TestBed.inject(ProductService);
    route = TestBed.inject(ActivatedRoute);
    // location = TestBed.inject(Location); // -> fails
    component['location'] = mockedLocation as Location;
  });

  afterEach(() => {
    mockLocationBack = false;
  });

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

  it('should go back if press goBack button', () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('11');
    spyOn(productService, 'getProduct').and.returnValue(of(mockProducts[0]));

    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('.btn-dark'));
    btn.nativeElement.click();

    fixture.detectChanges();

    // expect(mockedLocation.back).toHaveBeenCalled();
    expect(mockLocationBack).toBeTrue();
  });



});
