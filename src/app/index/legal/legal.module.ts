import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../common/material/material.module';
import { RouterModule } from '@angular/router';
import { LegalComponent } from './legal.component'
import { FlexLayoutModule } from '@angular/flex-layout';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CookiesComponent } from './cookies/cookies.component';

@NgModule({
    declarations: [
        LegalComponent,
        TermsComponent,
        PrivacyComponent,
        CookiesComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FlexLayoutModule
    ],
    exports: [
    ],
    providers: []
})
export class LegalModule { }