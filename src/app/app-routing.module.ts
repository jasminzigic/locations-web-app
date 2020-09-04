import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationsComponent } from './pages/locations/locations.component';
import { AuthGuard } from './guards/auth-guard.service'
import { UserResolver, LocationsResolver, CitiesResolver, LocationResolver } from './resolvers'
import { RegisterUserComponent } from './pages/register-user/register-user.component'
import { LoginComponent } from './pages/login/login.component'
import { NoContentComponent } from './pages/no-content/no-content.component'
import { LocationDetailsComponent } from './pages/location-details/location-details.component';

const routes: Routes = [
  {
    path: 'locations',
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolver
    },
    children: [
      {
        path: '',
        component: LocationsComponent,
        data: { title: 'Locations Service' },
        resolve: {
          locations: LocationsResolver,
          cities: CitiesResolver,
        },
        runGuardsAndResolvers: 'always',
      },
      {
        path: ':id',
        component: LocationDetailsComponent,
        data: { title: 'Location detail' },
        resolve: {
          location: LocationResolver,
          cities: CitiesResolver
        },
        runGuardsAndResolvers: 'always',
      }
    ]
  },
  {
    path: 'register',
    component: RegisterUserComponent,
    data: { title: 'Create account' }
  },
  {
    path: 'account',
    component: RegisterUserComponent,
    canActivate: [AuthGuard],
    resolve: { user: UserResolver },
    data: { title: 'Account', edit: true }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: '' },
  },
  {
    path: '',
    redirectTo: '/locations',
    pathMatch: 'full'
  },
  { path: '**', component: NoContentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
