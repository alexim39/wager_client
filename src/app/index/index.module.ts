import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { MaterialModule } from './../common/material/material.module';
import { IndexComponent } from './index.component';
import { NavComponent } from './nav/nav.component';
import { SlideComponent } from './slide/slide.component';
import { FeaturesComponent } from './features/features.component';
import { FooterComponent } from './footer/footer.component';
import { AuthModule } from './auth/auth.module';
import { LogoModule } from './../common/logo/logo.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IndexContentComponent } from './index-content/index-content.component';


@NgModule({
  declarations: [
    IndexComponent,
    NavComponent,
    SlideComponent,
    FeaturesComponent,
    FooterComponent,
    IndexContentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    LogoModule,
    AuthModule,
    IndexRoutingModule
  ],
  providers: []
})
export class LandingPageModule { }
