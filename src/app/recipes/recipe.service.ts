import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from '../shared/recipe.model';
import { Subject } from 'rxjs';
import { ShoppingService } from '../shopping-list/shopping.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipeSelected = new Subject<Recipe>();
  public recipesChanged = new Subject<Recipe[]>();

  private _recipes: Recipe[] = [];

  constructor(private shoppingService: ShoppingService) {}

  getRecipes() {
    return this._recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
    this.recipesChanged.next(this._recipes.slice());
  }

  getRecipeByID(index: number): Recipe {
    return this._recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
    this.recipesChanged.next(this._recipes.slice());
    // this.dataStorageService.storeRecipes();
  }

  updateRecipe(index: number, recipe: Recipe) {
    this._recipes[index] = recipe;
    this.recipesChanged.next(this._recipes.slice());
    // this.dataStorageService.storeRecipes();
  }

  deleteRecipeByID(index: number): void {
    this._recipes.splice(index, 1);
    this.recipesChanged.next(this._recipes.slice());
    // this.dataStorageService.storeRecipes();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredients(ingredients);
  }
}
