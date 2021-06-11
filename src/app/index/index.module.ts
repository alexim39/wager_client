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
import { AboutUsComponent } from './about-us/about-us.component';
import { IntroComponent } from './index-content/intro/intro.component';
import { VideoPresentationComponent } from './index-content/video-presentation/video-presentation.component';
import { GenerateIncomeComponent } from './index-content/generate-income/generate-income.component';
import { GetInTouchComponent } from './index-content/get-in-touch/get-in-touch.component';
import { LegalModule } from './legal/legal.module';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactService } from './contact/contact.service';

@NgModule({
  declarations: [
    IndexComponent,
    NavComponent,
    SlideComponent,
    FeaturesComponent,
    FooterComponent,
    IndexContentComponent,
    AboutUsComponent,
    IntroComponent,
    VideoPresentationComponent,
    GenerateIncomeComponent,
    GetInTouchComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    LegalModule,
    LogoModule,
    AuthModule,
    IndexRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ContactService]
})
export class LandingPageModule { }
