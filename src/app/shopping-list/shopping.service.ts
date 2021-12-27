import { Injectable, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService implements OnInit {
  ingredientsChanged = new Subject<Ingredient[]>();
  activeIngredientIndex = new Subject<number>();

  private _ingredients: Ingredient[] = [
    new Ingredient('apple', 5),
    new Ingredient('tomatoes', 10),
  ];

  constructor() {}

  ngOnInit() {
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  getIngredients() {
    return this._ingredients.slice();
  }

  getIngredient(index: number) {
    return this._ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  editIngredient(index: number, ingredient: Ingredient) {
    this._ingredients[index] = ingredient;
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  deleteIngredient(index: number): void {
    this._ingredients.splice(index, 1);
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.next(this._ingredients.slice());
  }
}
