import { Component, Input } from '@angular/core';
import { IRecipe } from '../../recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {

  @Input() recipe: IRecipe;
  @Input() index: number;

  constructor() { }
}
