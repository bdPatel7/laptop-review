import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KeyValuePair } from '../../models/laptop';
type CustomOptions = {
  value:string, display:string
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input()
  hddOptions!: CustomOptions[];
  @Input()
  locationOptions!: CustomOptions[];
  @Input()
  storageOptions!: {[key: string]: string};
  @Input()
  ramOptions!: {key:number, value:boolean}[];
  @Input()
  sliderValue!: number;
  @Output()
  optionChange: EventEmitter<KeyValuePair> = new EventEmitter<KeyValuePair>();
  // @Output()
  // checkboxChange: EventEmitter<KeyValuePair> = new EventEmitter<KeyValuePair>();

  sliderOptions!: number[];
  constructor() { }

  ngOnInit(): void {
    this.sliderOptions = Object.keys(this.storageOptions).map((k:string) => +k);    
  }

  optionChangeEvent(key: string, value:string| number): void{
    this.optionChange.emit({key, value})
  }
}
