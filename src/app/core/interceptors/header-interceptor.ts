import { HttpInterceptorFn } from '@angular/common/http';
import { Token } from '@angular/compiler';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  if(localStorage.getItem('token')){
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('token') !
      }
    })
  }
  return next(req);
};
