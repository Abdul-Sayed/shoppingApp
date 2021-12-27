import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe, IRecipe } from '../../shared/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  recipeEditMode = false;
  recipeId: number;
  currentRecipe: IRecipe;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.initForm();

    if (this.route.snapshot.params['id']) {
      this.route.params.subscribe((params: Params) => {
        this.recipeEditMode = true;
        this.recipeId = +params['id'];
        this.currentRecipe = this.recipeService.getRecipeByID(this.recipeId);
        this.initForm();
      });
    }
  }

  private initForm() {
    let rName = '';
    let rDescription = '';
    let rImagePath = '';
    let recipeIngredients = new FormArray([]);

    if (this.recipeEditMode) {
      rName = this.currentRecipe.name;
      rDescription = this.currentRecipe.description;
      rImagePath = this.currentRecipe.imagePath;
      if (this.currentRecipe.ingredients) {
        for (const ingr of this.currentRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              ingredientName: new FormControl(ingr.name, Validators.required),
              ingredientAmount: new FormControl(ingr.amount, [
                Validators.required,
                Validators.min(1),
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = this.formBuilder.group({
      recipeName: new FormControl(rName, Validators.required),
      recipeDescription: new FormControl(rDescription, Validators.required),
      recipeImage: new FormControl(rImagePath, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  getControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  addIngredient() {
    let ingredientArray = this.recipeForm.get('ingredients') as FormArray;
    const newIngredient = this.formBuilder.group({
      ingredientName: new FormControl('', Validators.required),
      ingredientAmount: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
    ingredientArray.push(newIngredient);
  }

  removeIngredient(index: number) {
    let ingredientArray = this.recipeForm.get('ingredients') as FormArray;
    ingredientArray.removeAt(index);
  }

  onSaveForm() {
    console.log(this.recipeForm.value);
    console.log(this.recipeForm.value.ingredients);
    const newRecipe = new Recipe(
      this.recipeForm.value.recipeName,
      this.recipeForm.value.recipeDescription,
      this.recipeForm.value.recipeImage,
      this.recipeForm.value.ingredients
    );
    if (this.recipeEditMode) {
      this.recipeService.updateRecipe(this.recipeId, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.router.navigate(['/recipes']);
  }

  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['/recipes']);
  }
}
