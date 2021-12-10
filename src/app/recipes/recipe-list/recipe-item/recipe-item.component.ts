import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IRecipe } from '../../recipe.model';
import {RecipeService} from '../../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {

  @Input() recipe!: IRecipe;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  onRecipeClick() {
    this.recipeService.recipeSelected.emit(this.recipe);
    this.router.navigate(['/recipes', this.recipe.name], {queryParams: this.recipe}); 
  }

}
