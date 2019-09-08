import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { parse } from 'querystring';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { ProductUtil } from 'src/app/utils/product.util';

@Component({
  selector: 'app-editor-product',
  templateUrl: './editor-product.component.html',
  styleUrls: ['./editor-product.component.css']
})
export class EditorProductComponent implements OnInit {
  public product: Product = new Product("", "", 0, "", 0, "VAR");
  public isUpdate: boolean = false;

  public form: FormGroup;
  public productClasses: any[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: DataService
  ) {


    this.activeRoute.queryParams.subscribe(params => {
      this.product = params["product"];
      console.log(JSON.stringify(params["product"]))
    });

    this.form = this.fb.group({
      code: ['', Validators.compose([
        Validators.required
      ])],
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(120),
        Validators.required
      ])],
      price: ['', Validators.compose([
        Validators.required
      ])],
      description: ['', Validators.compose([
        Validators.required
      ])],
      quantity: ['', Validators.compose([
        Validators.required
      ])],
      productClass: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  ngOnInit() {

    let code = this.activeRoute.snapshot.paramMap.get('par');

    if (code != "0") {
      this.isUpdate = true;
      let products = ProductUtil.get();
      let product = products.find(x => x.code == code);

      if (product) {
        this.product = product;
      }
      else {
        this.product = new Product("", "", 0, "", 0, "VAR");
      }
    }
    else {
      this.isUpdate = false;
      this.product = new Product("", "", 0, "", 0, "VAR");
    }

    this.form.controls['code'].setValue(this.product.code)
    this.form.controls['title'].setValue(this.product.title)
    this.form.controls['price'].setValue(this.product.price)
    this.form.controls['description'].setValue(this.product.description)
    this.form.controls['quantity'].setValue(this.product.quantity)
    this.form.controls['productClass'].setValue(this.product.productClass)

    this.productClasses.push({ code: "INF", title: "Informatica" });
    this.productClasses.push({ code: "DOM", title: "Eletrodomésticos" });
    this.productClasses.push({ code: "CAL", title: "Calçados" });
    this.productClasses.push({ code: "VAR", title: "Variados" });
  }

  submit() {
    this.form.disable();

    if (this.isUpdate) {
      this.service
        .updateProduct(this.form.value)
        .subscribe(
          (resp: any) => {
            console.log(resp.message);
          },
          (err) => {
            console.log(err.message);
          },
          () => {
            alert("Produto atualizado com sucesso!");
            this.form.enable();
            this.form.reset();
            this.router.navigate([``]);
          }
        );
    }
    else {
      this.service
        .saveProduct(this.form.value)
        .subscribe(
          (resp: any) => {
            console.log(resp.message);
          },
          (err) => {
            console.log(err.message);
          },
          () => {
            let products = ProductUtil.get();

            console.log(products);

            if (products) {
              products.push(this.form.value);
              console.log(products);
              ProductUtil.save(products);
            }

            alert("Produto cadastrado com sucesso!");
            this.form.enable();
            this.form.reset();
            this.router.navigate([``]);
          }
        );
    }
  }

  delete() {
    this.form.disable();
    this.service
      .deleteProduct(this.form.value)
      .subscribe(
        (resp: any) => {
          console.log(resp.message);
        },
        (err) => {
          console.log(err.message);
        },
        () => {
          this.form.enable();
          this.form.reset();
        }
      );
  }

}
