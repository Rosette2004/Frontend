import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CollectionService } from '../../../services/collection.service';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './collections.html',
  // styleUrls: ['./collections.scss'],
})
export class Collections implements OnInit {
  collections: any[] = [];

  constructor(private cs: CollectionService) {}

  ngOnInit() {
    this.loadCollections();
  }

  loadCollections() {
    this.cs.getAll().subscribe((data) => {
      this.collections = data;
    });
  }
}
