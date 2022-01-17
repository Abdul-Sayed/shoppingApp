import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  URL = 'https://ingredients-shopping-default-rtdb.firebaseio.com/recipes.json';
  recipes: Recipe[] = [];

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.URL).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients
              ? recipe.ingredients
              : (recipe.ingredients = []),
          };
        });
      }),
      tap((recipes) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      })
    );
  }

  storeRecipes(): void {
    this.recipes = this.recipeService.getRecipes();
    this.http.put(this.URL, this.recipes).subscribe((response) => {
      console.log(response);
    });
  }

  recipesChanged() {}
}
