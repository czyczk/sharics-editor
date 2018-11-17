import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestsPageComponent } from './test/tests-page/tests-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'editor' },
  // { path: '', component: HomePageComponent },
  { path: 'tests', component: TestsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
