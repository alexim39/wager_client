import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { MaterialModule } from './../common/material/material.module';
import { IndexComponent } from './index.component';
import { NavComponent } from './nav/nav.component';
import { SlideComponent } from './index-content/slide/slide.component';
import { FeaturesComponent } from './index-content/features/features.component';
import { FooterComponent } from './footer/footer.component';
import { AuthModule } from './auth/auth.module';
import { LogoModule } from './../common/logo/logo.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IndexContentComponent } from './index-content/index-content.component';
import { PlansComponent } from './plans/plans.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HelpCenterComponent } from './help-center/help-center.component';
import { IntroComponent } from './index-content/intro/intro.component';
import { VideoPresentationComponent } from './index-content/video-presentation/video-presentation.component';
import { GenerateIncomeComponent } from './index-content/generate-income/generate-income.component';
import { GetInTouchComponent } from './index-content/get-in-touch/get-in-touch.component';


@NgModule({
  declarations: [
    IndexComponent,
    NavComponent,
    SlideComponent,
    FeaturesComponent,
    FooterComponent,
    IndexContentComponent,
    PlansComponent,
    AboutUsComponent,
    HelpCenterComponent,
    IntroComponent,
    VideoPresentationComponent,
    GenerateIncomeComponent,
    GetInTouchComponent,
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
