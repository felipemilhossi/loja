import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserUtil } from 'src/app/Utils/user.utils';
import { ProductUtil } from 'src/app/utils/product.util';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  public userName: string;

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
    let user = UserUtil.get();
    this.userName = user.name;
  }

  logout() {
    UserUtil.clear();
    ProductUtil.clear();
    this.route.navigate(['login']);
  }

}
