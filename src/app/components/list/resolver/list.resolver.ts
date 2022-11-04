import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Laptop } from '../models/laptop';
import { ListService } from '../service/list.service';

@Injectable({
  providedIn: 'root'
})
export class ListResolver implements Resolve<Laptop[]> {
  constructor(
    private api: ListService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Laptop[] {
    return this.api.getAllProducts();
  }
}
