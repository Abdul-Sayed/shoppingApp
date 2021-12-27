import { Ingredient } from './ingredient.model';

export interface IRecipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
}

export class Recipe implements IRecipe {
  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[]
  ) {}
}
