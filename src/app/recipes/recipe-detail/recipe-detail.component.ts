import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { Recipe, IRecipe } from '../recipe.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})

export class RecipeDetailComponent implements OnInit {

  // @Input() currentRecipe: IRecipe;
  // currentRecipe: IRecipe;
  currentRecipe: any;

  constructor(public shoppingService: ShoppingService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.currentRecipe);
    console.log(this.route.snapshot.queryParams);
    this.currentRecipe = this.route.snapshot.queryParams;

    this.route.queryParams.subscribe(  // Use for dynamic params
      (params: Params) => {
        this.currentRecipe = params;
      }
    )
  }

  addIngredients() {
    this.shoppingService.addIngredients(this.currentRecipe.ingredients);
  }

}
