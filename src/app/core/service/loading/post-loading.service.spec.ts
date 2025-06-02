import { TestBed } from '@angular/core/testing';

import { PostLoadingService } from './post-loading.service';

describe('PostLoadingService', () => {
  let service: PostLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
