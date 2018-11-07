import { NgModule } from '@angular/core';
import {TestsPageComponent} from './tests-page.component';
import {TestAdaptiveImgComponent} from './test-adaptive-img/test-adaptive-img.component';
import {TestAPIComponent} from './test-api/test-api.component';
import {TestsPageRoutingModule} from './tests-page-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {CommonModule} from '@angular/common';
import { TestBackgroundMaskComponent } from './test-background-mask/test-background-mask.component';
import { TestMaskedButtonComponent } from './test-masked-button/test-masked-button.component';
import { TestDemo2Component } from './test-demo2/test-demo2.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TestsPageRoutingModule
  ],
  providers: [],
  exports: [
  ],
  entryComponents: [
    TestsPageComponent,
    TestAdaptiveImgComponent,
    TestAPIComponent,
  ],
  declarations: [
    TestsPageComponent,
    TestAdaptiveImgComponent,
    TestAPIComponent,
    TestBackgroundMaskComponent,
    TestMaskedButtonComponent,
    TestDemo2Component,
  ]
})
export class TestsPageModule { }
