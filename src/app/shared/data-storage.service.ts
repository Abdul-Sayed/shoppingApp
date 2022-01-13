import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, exhaustMap, map, take, tap } from 'rxjs/operators';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
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

  // fetchRecipes(): Observable<Recipe[]> {
  //   return this.authService.userToken.pipe(
  //     take(1),
  //     exhaustMap((token) => {
  //       return this.http.get<Recipe[]>(this.URL, {
  //         headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //         params: new HttpParams().set('auth', token),
  //       });
  //     }),
  //     map((recipes) => {
  //       return recipes.map((recipe) => {
  //         return {
  //           ...recipe,
  //           ingredients: recipe.ingredients
  //             ? recipe.ingredients
  //             : (recipe.ingredients = []),
  //         };
  //       });
  //     }),
  //     tap((recipes) => {
  //       console.log(recipes);
  //       this.recipeService.setRecipes(recipes);
  //     })
  //   );
  // }

  // storeRecipes() {
  //   this.recipes = this.recipeService.getRecipes();
  //   console.log('storing recipes');
  //   return this.authService.userToken.pipe(
  //     take(1),
  //     exhaustMap((token) => {
  //       console.log(token);
  //       return this.http.put(this.URL, this.recipes, {
  //         headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  //         params: new HttpParams().set('auth', token),
  //       });
  //     }),
  //     tap((recipes) => {
  //       console.log(recipes);
  //     })
  //   );
  // }

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
