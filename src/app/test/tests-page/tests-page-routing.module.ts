import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestAdaptiveImgComponent} from './test-adaptive-img/test-adaptive-img.component';
import {TestAPIComponent} from './test-api/test-api.component';
import {TestBackgroundMaskComponent} from './test-background-mask/test-background-mask.component';
import {TestMaskedButtonComponent} from './test-masked-button/test-masked-button.component';
import {TestDemo2Component} from './test-demo2/test-demo2.component';

const routes: Routes = [
  { path: 'tests', children: [
      { path: 'adaptive-img', component: TestAdaptiveImgComponent },
      { path: 'background-mask', component: TestBackgroundMaskComponent },
      { path: 'api', component: TestAPIComponent },
      { path: 'masked-button', component: TestMaskedButtonComponent },
      { path: 'demo2', component: TestDemo2Component },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsPageRoutingModule { }
