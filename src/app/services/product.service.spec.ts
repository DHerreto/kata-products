import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from '../models/product';
import { MessageService } from './message.service';
import { mockProducts } from '../models/product.mock';

describe('ProductService', () => {
  let productService: ProductService;
  let messageService: MessageService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'api/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    productService = TestBed.inject(ProductService);
    messageService = TestBed.inject(MessageService);
    httpTestingController = TestBed.inject(HttpTestingController); // permite mockear y simular request
    // https://angular.io/api/common/http/testing/HttpTestingController
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should retrieve products', () => {
    productService.getProducts().subscribe((products: Product[]) => {
      expect(products.length).toBeGreaterThan(0);
    });
    const req = httpTestingController.expectOne(apiUrl);
    req.flush(mockProducts);

    expect(req.request.method).toEqual('GET');
  });

  it('should log a message if retrieve products fails', () => {
    const mockStatusText = 'Internal Server Error';
    const spyMessage = spyOn(messageService, 'add').and.callThrough();

    productService.getProducts().subscribe();

    const req = httpTestingController.expectOne(apiUrl);
    req.flush('Retrieve products failed', {
      status: 500,
      statusText: mockStatusText,
    });
    expect(req.request.method).toEqual('GET');
    expect(spyMessage).toHaveBeenCalledWith(
      `ProductService: getProducts failed: Http failure response for api/products: 500 ${mockStatusText}`
    );
  });

  it('should retrieve product by id', () => {
    productService.getProduct(11).subscribe((product: Product) => {
      expect(product.id).toBe(11);
    });
    const req = httpTestingController.expectOne(apiUrl + '/11');
    req.flush(mockProducts[0]);

    expect(req.request.method).toEqual('GET');
  });

  it('should send product to update', () => {
    productService.updateProduct(mockProducts[0]).subscribe();
    const req = httpTestingController.expectOne(apiUrl);
    req.flush({ status: 200 });

    expect(req.request.method).toEqual('PUT');
  });

});
