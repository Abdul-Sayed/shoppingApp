import { Injectable, EventEmitter, OnInit } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService implements OnInit {

  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private _ingredients: Ingredient[] = [ 
    new Ingredient('apple', 5),
    new Ingredient('tomatoes', 10)
  ];

  constructor() { }

  ngOnInit() {
    this.ingredientsChanged.emit(this._ingredients.slice());
  }

  getIngredients() {
    return this._ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(new Ingredient(ingredient.name,  ingredient.amount));
    this.ingredientsChanged.emit(this._ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this._ingredients.slice());
  }
}
