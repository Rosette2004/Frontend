/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}


import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  featuredRecipes = [
    { title: 'Spaghetti Carbonara', author: 'Anna', image: 'assets/recipes/carbonara.jpg' },
    { title: 'Chicken Curry', author: 'Mohamed', image: 'assets/recipes/curry.jpg' },
    { title: 'Chocolate Cake', author: 'Sophia', image: 'assets/recipes/cake.jpg' },
  ];
}

*/
import { Component } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { NgFor } from '@angular/common'; // ✅ Fix for *ngFor
// import { HeaderBarComponent } from '../../shared/header-bar/header-bar.component';  // adjust path
import { MatIconModule } from '@angular/material/icon'; // ✅ For <mat-icon>// ✅ adjust path

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: true, // ✅ make sure it's standalone
  imports: [
    NgFor,
    // HeaderBarComponent, s
    Footer,
    MatIconModule,
  ],
})
export class Home {
  featuredRecipes = [
    {
      title: 'Creamy Shrimp Fettuccine',
      author: 'Anna',
      image: 'assets/recipes/shrimpp.jpg',
    },
    {
      title: 'Chicken Curry',
      author: 'Mohamed',
      image: 'assets/recipes/curry.jpg',
    },
    {
      title: 'Chocolate Cake',
      author: 'Sophia',
      image: 'assets/recipes/cake.jpg',
    },
  ];
}
