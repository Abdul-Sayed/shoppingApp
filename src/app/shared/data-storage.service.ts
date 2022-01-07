import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  URL = 'https://recipebook-6db49-default-rtdb.firebaseio.com/recipes.json';
  recipes: Recipe[] = [];

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(): void {
    this.recipes = this.recipeService.getRecipes();
    this.http.put(this.URL, this.recipes).subscribe((response) => {
      console.log(response);
    });
  }

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

  recipesChanged() {}
}
