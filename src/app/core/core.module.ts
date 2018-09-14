import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdaptiveImgComponent} from './adaptive-img/adaptive-img.component';
import {BackgroundMaskComponent} from './background-mask/background-mask.component';
import { MaskedInputComponent } from './masked-input/masked-input.component';
import {FormsModule} from '@angular/forms';
import { MaskedAbstractComponent } from './masked-abstract/masked-abstract.component';
import { MaskedButtonComponent } from './masked-button/masked-button.component';
import { MaskedContainerComponent } from './masked-container/masked-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    AdaptiveImgComponent,
    BackgroundMaskComponent,
    MaskedInputComponent,
    MaskedButtonComponent,
    MaskedContainerComponent,
  ],
  declarations: [
    AdaptiveImgComponent,
    BackgroundMaskComponent,
    MaskedInputComponent,
    MaskedButtonComponent,
    MaskedContainerComponent,
  ]
})
export class CoreModule { }
