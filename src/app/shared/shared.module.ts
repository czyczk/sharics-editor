import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '../core/core.module';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    CoreModule,
    TranslateModule,
  ],
  declarations: []
})
export class SharedModule { }
