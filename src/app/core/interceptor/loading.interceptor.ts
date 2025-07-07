import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { delay, finalize, Observable } from "rxjs";

export function loadingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const loadingService = inject(LoadingService);
  loadingService.setLoading(true);
  return next(req).pipe(
    delay(2000),
    finalize(() => loadingService.setLoading(false))
  );
}
