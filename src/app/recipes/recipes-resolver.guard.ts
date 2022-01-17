import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../shared/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverGuard implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(): Observable<Recipe[]> | Recipe[] {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}

/*
Note: This resolver guard is meant to pre-fetch the recipes from the server in case
the user enters the recipes/id or recipes/id/edit routes manually from the url bar
*/
