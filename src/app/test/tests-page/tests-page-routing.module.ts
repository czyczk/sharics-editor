import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestAdaptiveImgComponent} from './test-adaptive-img/test-adaptive-img.component';
import {TestAPIComponent} from './test-api/test-api.component';
import {TestBackgroundMaskComponent} from './test-background-mask/test-background-mask.component';

const routes: Routes = [
  { path: 'tests', children: [
      { path: 'adaptive-img', component: TestAdaptiveImgComponent },
      { path: 'background-mask', component: TestBackgroundMaskComponent },
      { path: 'api', component: TestAPIComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsPageRoutingModule { }
