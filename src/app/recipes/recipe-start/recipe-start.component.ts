import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { DataStorageService } from '../../shared/data-storage.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.scss'],
})
export class RecipeStartComponent implements OnInit {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      this.dataStorageService.fetchRecipes().pipe(first()).subscribe();
    }
  }
}
