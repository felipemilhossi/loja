import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { DataService } from 'src/app/data.service';
import { Router, NavigationExtras } from '@angular/router';
import { ProductUtil } from 'src/app/utils/product.util';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products: Product[];

  constructor(
    private service: DataService,
    private route: Router,
  ) { }

  ngOnInit() {

    var productsStorage = ProductUtil.get();

    if (productsStorage && productsStorage.length > 0) {
      console.log(productsStorage + " - productsStorage")
      this.products = productsStorage;
    }
    else {
      this.service.getProducts()
        .subscribe(
          (res: any) => {
            console.log(res + " - API")
            this.products = res;
            ProductUtil.save(res);
          },
          (err) => {
            alert("Falha ao obter a lista de produtos. Tente novamente mais tarde");
          }
        )
    }
  }

  select(product: Product) {

    let navigationExtras: NavigationExtras = {
      queryParams: { product }
    };

    this.route.navigate([`product/${product.code}`], navigationExtras);
  }

  delete(product: Product) {
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }

  newProduct() {
    var product = new Product("", "", 0, "", 0, "VAR");

    let navigationExtras: NavigationExtras = {
      queryParams: { product }
    };

    this.route.navigate([`product/0`], navigationExtras);
  }
}
