export interface Recipe {
  _id?: string;
  title: string;
  ingredients: string[]; // backend expects array
  instructions: string;
  time?: string;
  coverImage?: string;
  createdAt?: string;
  updatedAt?: string;
}
