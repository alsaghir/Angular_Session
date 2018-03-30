import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {ServersComponent} from './servers/servers.component';
import {UsersComponent} from './users/users.component';

/**
 * Create array of objects, each object represents a route of path, component and
 * any additional parameters
 *
 * Tips:
 * Empty path means the root path
 * Don't use /users. Instead always use users
 * path ** means anything and MuST be the latest route
 * Use redirectTo instead of component loading for redirecting
 * pathMatch means that this route redirects a URL that fully matches the specified path (**) to the route whose path is '/servers'.
 */

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'servers', component: ServersComponent},
  {path: 'users', component: UsersComponent},
  { path: '**', redirectTo: '/servers', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
