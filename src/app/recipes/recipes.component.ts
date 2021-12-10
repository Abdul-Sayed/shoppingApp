import { Component, OnInit } from '@angular/core';
import { Recipe, IRecipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  selectedRecipe!: IRecipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe( (recipe: IRecipe) => this.selectedRecipe = recipe);
  }

  onRecipeChosen(rcp:IRecipe) {
    this.selectedRecipe = rcp;
  }

}
