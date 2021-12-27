import { Component, Input } from '@angular/core';
import { IRecipe } from '../../../shared/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent {
  @Input() recipe: IRecipe;
  @Input() index: number;

  constructor() {}
}
