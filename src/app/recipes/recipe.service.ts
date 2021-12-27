import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe, IRecipe } from '../shared/recipe.model';
import { Subject } from 'rxjs';
import { ShoppingService } from '../shopping-list/shopping.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipeSelected = new Subject<IRecipe>();
  public recipesChanged = new Subject<IRecipe[]>();

  private _recipes: IRecipe[] = [
    new Recipe(
      'Schnitzel',
      'German Hotdog',
      'https://cdn.pixabay.com/photo/2015/04/29/19/33/cookbook-746005_1280.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 4)]
    ),
    new Recipe(
      'Hamburger',
      'Fat patty',
      'https://cdn.pixabay.com/photo/2015/04/29/19/33/cookbook-746005_1280.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Buns', 2)]
    ),
  ];

  getRecipes() {
    return this._recipes.slice();
  }

  getRecipeByID(index: number): IRecipe {
    return this._recipes[index];
  }

  deleteRecipeByID(index: number): void {
    this._recipes.splice(index, 1);
    this.recipesChanged.next(this._recipes.slice());
  }

  addRecipe(recipe: IRecipe) {
    this._recipes.push(recipe);
    this.recipesChanged.next(this._recipes.slice());
  }

  updateRecipe(index: number, recipe: IRecipe) {
    this._recipes[index] = recipe;
    this.recipesChanged.next(this._recipes.slice());
  }
}
