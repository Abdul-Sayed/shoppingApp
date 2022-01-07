import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  private recipesChangedSubscription: Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipesChangedSubscription =
      this.recipeService.recipesChanged.subscribe((newRecipes) => {
        console.log(newRecipes);
        this.recipes = newRecipes;
      });
  }

  ngOnDestroy() {
    this.recipesChangedSubscription.unsubscribe();
  }
}
