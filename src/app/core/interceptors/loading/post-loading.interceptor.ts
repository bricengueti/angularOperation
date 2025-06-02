import { HttpInterceptorFn } from '@angular/common/http';
import { PostLoadingService } from '../../service/loading/post-loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const postLoadingInterceptor: HttpInterceptorFn = (req, next) => {
const loaderService = inject(PostLoadingService);

  if (req.method === 'POST') {
    loaderService.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (req.method === 'POST') {
          loaderService.hide();
      }
    })
  );
};
