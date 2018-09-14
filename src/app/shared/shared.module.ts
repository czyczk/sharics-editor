import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    CoreModule,
  ],
  declarations: []
})
export class SharedModule { }
