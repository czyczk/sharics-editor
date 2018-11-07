import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestsPageComponent} from './test/tests-page/tests-page.component';
import {HomePageDeprecatedComponent} from './content/deprecated/home-page-deprecated/home-page-deprecated.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'editor' },
  // { path: 'home', component: HomePageComponent },
  { path: 'tests', component: TestsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
