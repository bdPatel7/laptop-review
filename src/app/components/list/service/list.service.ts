import { Injectable } from '@angular/core';
import * as list from '../../../../assets/data/data.json';
import { Laptop } from '../models/laptop';
@Injectable({
  providedIn: 'root'
})
export class ListService {

  private laptops:Laptop[] = (list as any).default;
  constructor() { }

  getAllProducts(): Laptop[]{
    return this.laptops.map(l => {
      return{
        ...l,
        ram: +(l.RAM.split("GB")[0])
      }
    });
     
  }
}
