import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { HeaderComponent } from '../../component/header/header.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule,SidebarComponent,HeaderComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

}
