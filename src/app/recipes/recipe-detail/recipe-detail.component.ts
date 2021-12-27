import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { RecipeService } from '../recipe.service';
import { IRecipe } from '../../shared/recipe.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  currentRecipe: IRecipe;
  id: number;

  constructor(
    public shoppingService: ShoppingService,
    public recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.currentRecipe = this.recipeService.getRecipeByID(this.id);

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.currentRecipe = this.recipeService.getRecipeByID(this.id);
    });
  }

  addIngredients() {
    if (this.currentRecipe) {
      this.shoppingService.addIngredients(this.currentRecipe.ingredients);
    }
  }

  editRecipe() {
    this.router.navigate(['/recipes', this.id, 'edit']);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipeByID(this.id);
    this.router.navigate(['/recipes']);
  }
}
