import { Component } from '@angular/core';
import { ProductDumpComponent } from "./product-dump/product-dump.component";

@Component({
  selector: 'app-product-smart',
  standalone: true,
  imports: [ProductDumpComponent],
  templateUrl: './product-smart.component.html',
  styleUrl: './product-smart.component.scss'
})
export class ProductSmartComponent {

}
