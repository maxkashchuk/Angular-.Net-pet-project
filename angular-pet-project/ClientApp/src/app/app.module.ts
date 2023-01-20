import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgRatingBarModule } from 'ng-rating-bar';
import { NgbProgressbarModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { LyButtonModule } from '@alyle/ui/button';
import { Color } from '@alyle/ui/color';
import { LY_THEME, LY_THEME_NAME, StyleRenderer, LyTheme2, LyCommonModule, LyClasses, lyl } from '@alyle/ui';
import { MinimaLight, MinimaDeepDark, MinimaDark } from '@alyle/ui/themes/minima';
import { CropCircleComponent } from './cropper-circle/cropper-circle.component';

import { AppComponent, STYLES as APP_STYLES } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FeatureService } from './app.feature.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthService } from './app.authentication.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { LySliderModule } from '@alyle/ui/slider';
import { LyIconModule } from '@alyle/ui/icon';
import { LyDialogModule } from '@alyle/ui/dialog';
import { LyGridModule } from '@alyle/ui/grid';
import { LyTypographyModule } from '@alyle/ui/typography';
import { LyAvatarModule } from '@alyle/ui/avatar';

@Injectable()
export class CustomMinimaLight {
  name = 'minima-light';
  demoBg = new Color(0x8c8c8c);
}

@Injectable()
export class CustomMinimaDark {
  name = 'minima-dark';
  demoBg = new Color(); // Black
  exampleContainer: ((__: LyClasses<typeof APP_STYLES>)
    => (className: string) => string) | null = null;
}

@Injectable()
export class CustomMinimaDeepDark extends CustomMinimaDark {
  override name = 'minima-deep-dark';
  override exampleContainer = (__: LyClasses<typeof APP_STYLES>) => lyl `{
    ${__.exampleContainer} {
      box-shadow: 0px 0px 0px 2px #353535
      border-radius: 9px
      overflow: hidden
      background: none
    }
  }`
}

export type AppThemeVariables = MinimaLight
& MinimaDark
& CustomMinimaLight
& CustomMinimaDark;


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegisterComponent,
    SignInComponent,
    UserProfileComponent,
    CropCircleComponent,
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
    CommonModule,
    MatDialogModule,
    LyButtonModule,
    LyImageCropperModule,
    LySliderModule,
    LyButtonModule,
    LyIconModule,
    LyDialogModule,
    LyGridModule,
    LyTypographyModule,
    LyAvatarModule,
    NgbModule,
  ],
  providers: [FeatureService, AuthService,
    StyleRenderer,
    LyTheme2,
    { provide: LY_THEME_NAME, useValue: 'minima-deep-dark' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true },
    { provide: LY_THEME, useClass: MinimaDeepDark, multi: true },
    { provide: LY_THEME, useClass: MinimaDark, multi: true },
    { provide: LY_THEME, useClass: CustomMinimaLight, multi: true }, // name minima-light
    { provide: LY_THEME, useClass: CustomMinimaDark, multi: true }, // name minima-dark
    { provide: LY_THEME, useClass: CustomMinimaDeepDark, multi: true }, // name minima-deep-dark
  ],
  exports: [CropCircleComponent],
  bootstrap: [AppComponent, CropCircleComponent],
})
export class AppModule { }
