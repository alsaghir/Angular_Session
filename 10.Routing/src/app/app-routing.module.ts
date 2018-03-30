import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },


  /**
   * We can pass a parameter in route path as below
   *
   */

  { path: 'users', component: UsersComponent, children: [
                                                          { path: ':id/:name', component: UserComponent }
                                                        ]
  },


  /**
   * Gaurds:
   *
   * canActivate runs before route navigation .. could be applied on each child route but for all children we use canActivateChild
   * canActivateChild runs before chouldren routes navigation
   * canDeactivate runs after route navigation when navigating away, IN a component See EditServerComponent
   *
   * a gaurd is simply a service with specific configuration to execute in
   * specific time
   * It should be provided in appModule since it is a service
   *
   * Gaurds applied to the route and its childs and could be more than gaurd in the array as below
   *
   * Finally, to delay rendering the routed component until all necessary data have been fetched, you need a resolver.
   * The name of the resolver in resolve option below is totally optional (we choose 'server')
   *
   */

  {
    path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
            { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}, data: {testMessage: 'Static Data!'} },
            { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
              ]
  },


  /**
   * Data could be password to route here
   */

  // { path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },


  // Anything not above, ORDER IS IMPORTANT
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
