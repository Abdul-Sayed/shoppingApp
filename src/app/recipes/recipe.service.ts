import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe, IRecipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [ 
    new Recipe(
      'Schnitzel',
      'German Hotdog',
      'https://cdn.pixabay.com/photo/2015/04/29/19/33/cookbook-746005_1280.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 4)
      ]
    ),
    new Recipe(
      'Hamburger',
      'Fat patty',
      'https://cdn.pixabay.com/photo/2015/04/29/19/33/cookbook-746005_1280.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Buns', 2)
      ]
    )
  ];
  public recipeSelected = new EventEmitter<IRecipe>();


  getRecipes() {
    return this.recipes.slice();
  }
}
