import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestsPageComponent} from './test/tests-page/tests-page.component';
import {HomePageComponent} from './content/home-page/home-page.component';

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
