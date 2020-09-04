import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptBasicAuthService } from './services/http//interceptor';
import { LocationsComponent } from './pages/locations/locations.component'
import { RegisterUserComponent } from './pages/register-user/register-user.component'
import { LoginComponent } from './pages/login/login.component'
import { NoContentComponent } from './pages/no-content/no-content.component'
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthGuard } from './guards/auth-guard.service';
import { NotifierModule } from 'angular-notifier';
import { UserResolver, LocationsResolver, CitiesResolver, LocationResolver } from './resolvers';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddLocationComponent } from './dialogs/add-location/add-location.component';
import { MatSelectModule } from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { CityService } from './api/city.service';
import { UserService } from './api/user.service';
import { LocationService } from './api/location.service';
import { LocationDetailsComponent } from './pages/location-details/location-details.component';
import { AgmCoreModule } from '@agm/core';
import { ConfirmDialogComponent } from './dialogs/confirm/confirm.component'
import { TitleService } from './services/title.service'


@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent,
    NoContentComponent,
    RegisterUserComponent,
    LoginComponent,
    AddLocationComponent,
    LocationDetailsComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSelectModule,
    MatTableModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right'
        },
        vertical: {
          position: 'bottom'
        }
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAHzQzBPQ75AuZ1qTmsk8cAkxKBGwQtilg'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptBasicAuthService,
      multi: true
    },
    AuthGuard,
    UserResolver,
    LocationsResolver,
    CitiesResolver,
    CityService,
    UserService,
    LocationService,
    LocationResolver,
    TitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
