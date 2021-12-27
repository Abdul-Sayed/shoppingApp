import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  activeIngredientSubscription: Subscription;
  editMode = false;
  activeIngredientIndex: number;
  activeIngredient: Ingredient;
  @ViewChild('f') ingredientForm: NgForm;

  constructor(public shoppingService: ShoppingService) {}

  ngOnInit() {
    this.activeIngredientSubscription =
      this.shoppingService.activeIngredientIndex.subscribe((index: number) => {
        this.activeIngredientIndex = index;
        this.editMode = true;
        this.activeIngredient = this.shoppingService.getIngredient(index);
        this.ingredientForm.setValue({
          name: this.activeIngredient.name,
          amount: this.activeIngredient.amount,
        });
      });
  }
  editIngredient(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, +form.value.amount);
    if (this.editMode) {
      this.shoppingService.editIngredient(
        this.activeIngredientIndex,
        newIngredient
      );
    } else {
      this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onReset(form: NgForm) {
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.activeIngredientIndex);
    this.onReset(this.ingredientForm);
  }

  ngOnDestroy() {
    this.activeIngredientSubscription.unsubscribe();
  }
}
