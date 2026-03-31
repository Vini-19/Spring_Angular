import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthRequest =
    req.url.includes('/login') || req.url.includes('/refreshToken');

  let authReq = req;

  if (!isAuthRequest) {
    const token = authService.obtenerToken();

    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isAuthRequest) {
        const refreshToken = authService.obtenerRefreshToken();

        if (!refreshToken) {
          authService.logout();
          router.navigate(['/login']);
          return throwError(() => error);
        }

        return authService.refreshToken().pipe(
          switchMap((response) => {
            authService.guardarToken(response.accessToken);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`
              }
            });

            return next(retryReq);
          }),
          catchError((refreshError) => {
            authService.logout();
            router.navigate(['/login']);
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};