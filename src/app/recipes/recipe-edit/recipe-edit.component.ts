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
import { Recipe } from '../../shared/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  recipeEditMode = false;
  recipeId: number;

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
        this.initForm();
      });
    }
  }

  private initForm() {
    let rName = '';
    let rDescription = '';
    let rImagePath = '';
    let recipeIngredients = new FormArray([]);

    const currentRecipe = this.recipeService.getRecipeByID(this.recipeId);

    if (this.recipeEditMode) {
      rName = currentRecipe.name;
      rDescription = currentRecipe.description;
      rImagePath = currentRecipe.imagePath;
      if (currentRecipe.ingredients) {
        for (const ingr of currentRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingr.name, Validators.required),
              amount: new FormControl(ingr.amount, [
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
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl('', [
          Validators.required,
          Validators.min(1),
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  removeIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onSaveForm() {
    console.log(this.recipeForm.value);
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
