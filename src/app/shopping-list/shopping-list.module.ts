import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShoppingListComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
  exports: [],
})
export class ShoppingListModule {}
