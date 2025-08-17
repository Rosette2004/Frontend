import { provideRouter, Route } from '@angular/router';
import { Home } from './pages/home/home';
import { Recipes } from './pages/recipes/recipes';
import { RecipeDetail } from './pages/recipe-detail/recipe-detail';
import { RecipeForm } from './pages/recipe-form/recipe-form';
import { Login } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';

export const routes: Route[] = [
  { path: '', component: Home },
  { path: 'recipes', component: Recipes },
  { path: 'recipes/new', component: RecipeForm },
  { path: 'recipes/edit/:id', component: RecipeForm },
  { path: 'recipes/:id', component: RecipeDetail },
  { path: 'login', component: Login },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' },
];

export const appRoutes = provideRouter(routes);
