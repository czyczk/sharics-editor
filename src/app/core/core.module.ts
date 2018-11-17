import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdaptiveImgComponent } from './adaptive-img/adaptive-img.component';
import { BackgroundMaskDeprecatedComponent } from './deprecated/background-mask-deprecated/background-mask-deprecated.component';
import { MaskedInputDeprecatedComponent } from './deprecated/masked-input-deprecated/masked-input-deprecated.component';
import { FormsModule } from '@angular/forms';
import { MaskedButtonDeprecatedComponent } from './deprecated/masked-button-deprecated/masked-button-deprecated.component';
import { MaskedContainerDeprecatedComponent } from './deprecated/masked-container-deprecated/masked-container-deprecated.component';
import { ShrDropdownComponent } from './shr-dropdown/shr-dropdown.component';
import { LongPressDirective } from './directive/long-press/long-press.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    AdaptiveImgComponent,
    BackgroundMaskDeprecatedComponent,
    MaskedInputDeprecatedComponent,
    MaskedButtonDeprecatedComponent,
    MaskedContainerDeprecatedComponent,
    ShrDropdownComponent,
    LongPressDirective,
  ],
  declarations: [
    AdaptiveImgComponent,
    BackgroundMaskDeprecatedComponent,
    MaskedInputDeprecatedComponent,
    MaskedButtonDeprecatedComponent,
    MaskedContainerDeprecatedComponent,
    ShrDropdownComponent,
    LongPressDirective,
  ]
})
export class CoreModule { }
