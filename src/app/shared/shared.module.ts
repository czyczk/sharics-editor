import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '../core/core.module';
import {TranslateModule} from '@ngx-translate/core';
import {ToastContainerModule, ToastrModule} from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ToastrModule.forRoot({
      positionClass: 'inline',
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true,
      easeTime: 200
    }),
    ToastContainerModule,
  ],
  exports: [
    CoreModule,
    TranslateModule,
    ToastrModule,
    ToastContainerModule,
  ],
  declarations: []
})
export class SharedModule { }
