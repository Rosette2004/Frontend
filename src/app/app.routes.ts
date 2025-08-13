import { provideRouter, Route } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { RecipesComponent } from './pages/recipes/recipes';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail';
import { RecipeFormComponent } from './pages/recipe-form/recipe-form';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';

export const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/new', component: RecipeFormComponent },
  { path: 'recipes/edit/:id', component: RecipeFormComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' },
];

export const appRoutes = provideRouter(routes);
