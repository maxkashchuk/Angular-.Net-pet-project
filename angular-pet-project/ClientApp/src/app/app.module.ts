import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FeatureService } from './app.feature.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthService } from './app.authentication.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgRatingBarModule } from 'ng-rating-bar';
import { NgbProgressbarModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegisterComponent,
    SignInComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent, pathMatch: 'full' },
      { path: 'sign-in', component: SignInComponent, pathMatch: 'full' },
      { path: 'user-profile', component: UserProfileComponent, pathMatch: 'full' }
    ]),
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    ScrollingModule,
    NgRatingBarModule,
    NgbProgressbarModule,
    NgbModule,
  ],
  providers: [FeatureService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
