import {
  ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.services';
import {Injectable} from '@angular/core';
import {stat} from 'fs';
import {instantiationError} from '@angular/core/src/di/reflective_errors';


@Injectable()
export class AuthGuard implements CanActivate , CanActivateChild{

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            return true;
          }
          else {
            this.router.navigate(['/']);
          }
        }
      );
  }

  canActivateChild(route:ActivatedRouteSnapshot,
  state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean{
    return this.canActivate(route,state) ;

  }
}
