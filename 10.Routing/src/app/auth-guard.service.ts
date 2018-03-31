import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * https://spring.io/understanding/javascript-promises
   */

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot)
              : Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated() // canActivate returns Promise in this case hence, isAuthenticated() does too
      .then( // then() here will run with whatever data resloved from the Promise returned by isAuthenticated()
        (authenticated: boolean) => {
          if (authenticated) { return true; } else { this.router.navigate(['/']); return false; }
        }
      );
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot)
                   : Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
