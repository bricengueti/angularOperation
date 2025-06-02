import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  lastUpdated: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-dump',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-dump.component.html',
  styleUrl: './product-dump.component.scss'
})
export class ProductDumpComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 8;
  totalProducts: number = 0;
  totalPages: number = 0;
  pages: number[] = [];
  startIndex: number = 0;
  endIndex: number = 0;

  // Delete modal
  showDeleteModal: boolean = false;
  productToDeleteId: number | null = null;

  // Sorting
  sortField: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    // Simuler le chargement des données depuis une API
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Laptop Pro X1',
        category: 'Electronics',
        price: 1299.99,
        stock: 45,
        lastUpdated: '2025-05-15',
        imageUrl: 'https://blob.v0.dev/Yd9Hs.jpg'
      },
      {
        id: 2,
        name: 'Wireless Headphones',
        category: 'Audio',
        price: 199.99,
        stock: 120,
        lastUpdated: '2025-05-18',
        imageUrl: 'https://blob.v0.dev/Yd9Hs.jpg'
      },
      {
        id: 3,
        name: 'Ergonomic Office Chair',
        category: 'Furniture',
        price: 249.99,
        stock: 32,
        lastUpdated: '2025-05-10',
        imageUrl: 'https://blob.v0.dev/Yd9Hs.jpg'
      },
      {
        id: 4,
        name: 'Smart Watch Series 5',
        category: 'Wearables',
        price: 349.99,
        stock: 78,
        lastUpdated: '2025-05-20',
        imageUrl: 'https://blob.v0.dev/Yd9Hs.jpg'
      },
      {
        id: 5,
        name: 'Ultra HD Monitor 32"',
        category: 'Electronics',
        price: 499.99,
        stock: 25,
        lastUpdated: '2025-05-12',
        imageUrl: 'https://blob.v0.dev/Yd9Hs.jpg'
      },
      {
        id: 6,
        name: 'Mechanical Keyboard',
        category: 'Accessories',
        price: 129.99,
        stock: 60,
        lastUpdated: '2025-05-22',
        imageUrl: 'https://blob.v0.dev/Yd9Hs.jpg'
      },
      {
        id: 7,
        name: 'Wireless Mouse',
        category: 'Accessories',
        price: 49.99,
        stock: 95,
        lastUpdated: '2025-05-19',
        imageUrl: 'https://blob.v0.dev/Yd9Hs.jpg'
      },
      {
        id: 8,
        name: 'External SSD 1TB',
        category: 'Storage',
        price: 159.99,
        stock: 42,
        lastUpdated: '2025-05-17',
        imageUrl: 'https://blob.v0.dev/Yd9Hs.jpg'
      },
      {
        id: 9,
        name: 'Bluetooth Speaker',
        category: 'Audio',
        price: 89.99,
        stock: 68,
        lastUpdated: '2025-05-14',
        imageUrl: 'https://blob.v0.dev/Yd9Hs.jpg'
      },
      {
        id: 10,
        name: 'Graphic Tablet',
        category: 'Accessories',
        price: 199.99,
        stock: 37,
        lastUpdated: '2025-05-16',
        imageUrl: 'https://blob.v0.dev/Yd9Hs.jpg'
      },
      {
        id: 11,
        name: 'Webcam HD Pro',
        category: 'Electronics',
        price: 79.99,
        stock: 53,
        lastUpdated: '2025-05-21',
        imageUrl: 'https://blob.v0.dev/Yd9Hs.jpg'
      },
      {
        id: 12,
        name: 'USB-C Hub',
        category: 'Accessories',
        price: 39.99,
        stock: 110,
        lastUpdated: '2025-05-13',
        imageUrl: 'https://blob.v0.dev/Yd9Hs.jpg'
      }
    ];

    this.products = mockProducts;
    this.totalProducts = this.products.length;
    this.applyFilters();
  }

  applyFilters(): void {
    // Appliquer la recherche
    let filtered = this.products;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      );
    }

    // Appliquer le tri
    filtered = this.sortProducts(filtered);

    // Mettre à jour le total après filtrage
    this.totalProducts = filtered.length;

    // Mettre à jour la pagination
    this.updatePagination();

    // Appliquer la pagination
    this.filteredProducts = filtered.slice(this.startIndex, this.endIndex);
  }

  sortProducts(products: Product[]): Product[] {
    return [...products].sort((a, b) => {
      let valueA: any = a[this.sortField as keyof Product];
      let valueB: any = b[this.sortField as keyof Product];

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.totalProducts / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex = Math.min(this.startIndex + this.pageSize, this.totalProducts);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilters();
    }
  }

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  sortBy(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  getSortIcon(field: string): string {
    if (this.sortField !== field) {
      return 'sort';
    }
    return this.sortDirection === 'asc' ? 'sort-up' : 'sort-down';
  }

  addNewProduct(): void {
    this.router.navigate(['/products/add']);
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number): void {
    this.productToDeleteId = id;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.productToDeleteId = null;
  }

  confirmDelete(): void {
    if (this.productToDeleteId !== null) {
      // Simuler la suppression
      this.products = this.products.filter(product => product.id !== this.productToDeleteId);
      this.applyFilters();

      // Fermer le modal
      this.showDeleteModal = false;
      this.productToDeleteId = null;
    }
  }

  getStockStatusClass(stock: number): string {
    if (stock <= 10) {
      return 'bg-red-100 text-red-800';
    } else if (stock <= 30) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-green-100 text-green-800';
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  }
}
