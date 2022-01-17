import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [AlertComponent, LoadingSpinnerComponent, DropdownDirective],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
})
export class SharedModule {}
