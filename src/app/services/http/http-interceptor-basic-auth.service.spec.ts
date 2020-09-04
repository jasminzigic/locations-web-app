import { TestBed } from '@angular/core/testing';
import { HttpInterceptBasicAuthService } from './interceptor';


describe('HttpIntercepterBasicAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpInterceptBasicAuthService = TestBed.get(HttpInterceptBasicAuthService);
    expect(service).toBeTruthy();
  });
});
