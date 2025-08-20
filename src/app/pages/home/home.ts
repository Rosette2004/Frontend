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
import { Component, OnInit } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { NgFor } from '@angular/common';
// import { HeaderBarComponent } from '../../shared/header-bar/header-bar.component';  // adjust path
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: true,
  imports: [
    NgFor,
    // HeaderBarComponent, s
    Footer,
    MatIconModule,
    RouterLink,
  ],
})
export class Home {
  featuredRecipes = [
    {
      id: 1,
      title: 'Creamy Shrimp Fettuccine',
      author: 'Anna',
      image: 'assets/recipes/shrimpp.jpg',
    },
    {
      id: 2,
      title: 'Chicken Curry',
      author: 'Mohamed',
      image: 'assets/recipes/curry.jpg',
    },
    {
      id: 3,
      title: 'Chocolate Cake',
      author: 'Sophia',
      image: 'assets/recipes/cake.jpg',
    },
  ];
  stats = { recipes: 1240, collections: 86, users: 312 };
}

// constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.http
//       .get<{ count: number }>('/recipe/count')
//       .subscribe((r) => (this.stats.recipes = r.count));
//     this.http
//       .get<{ count: number }>('/api/users/count')
//       .subscribe((r) => (this.stats.users = r.count));
//   }
// }
