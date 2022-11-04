import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeyValuePair, Laptop } from './models/laptop';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationComponent } from './components/pagination/pagination.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  
  //data
  list!: Laptop[];
  filterList!:Laptop[];
  
  //table & pagination
  dataSource!: MatTableDataSource<Laptop>;
  displayedColumns!:string[];
  @ViewChild('appPaginator') appPaginator!: PaginationComponent;

  //filter
  hddOptions = [
    {value:'',display:'Select HDD'},
    {value:'SAS',display:'SAS'},
    {value:'SATA',display:'SATA'},
    {value:'SSD',display:'SSD'}
  ];
  locationOptions = [
    {value:'',display:'Select Location'},
    {value:'AmsterdamAMS-01',display:'AmsterdamAMS-01'},
    {value:'Washington D.C.WDC-01',display:'Washington D.C.WDC-01'},
    {value:'San FranciscoSFO-12',display:'San FranciscoSFO-12'},
    {value:'DallasDAL-10',display:'DallasDAL-10'},
    {value:'FrankfurtFRA-10',display:'FrankfurtFRA-10'},
    {value:'Hong KongHKG-10',display:'Hong KongHKG-10'},
    {value:'SingaporeSIN-11',display:'SingaporeSIN-11'}
  ];
  storageOptions:{[key: number]: string}={
    0:'0', 
    1:'250GB',
    2:'500GB',
    3:'1TB',
    4:'2TB',
    5:'3TB',
    6:'4TB',
    7:'8TB',
    8:'12TB',
    9:'24TB',
    10:'48TB',
    11:'72TB'
  }
  ramOptions=[
    {key:2,value:false},
    {key:4,value:false},
    {key:8,value:false},
    {key:12,value:false},
    {key:16,value:false},
    {key:24,value:false},
    {key:32,value:false},
    {key:48,value:false},
    {key:64,value:false},
    {key:96,value:false}
  ] 
  sliderIndex=0;
  sliderActualValue=this.storageOptions[this.sliderIndex];
  hddValue='';
  locationValue='';
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (res: any) => {
        if(res?.data?.length){
          this.list = res.data as Laptop[];
          this.filterList = res.data as Laptop[];
          
          this.displayedColumns = Object.keys(this.filterList[0]);
          this.displayedColumns.splice(this.displayedColumns.indexOf('ram'), 1);
          this.dataSource = new MatTableDataSource<Laptop>(this.filterList);          
        }
      }
    )
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.appPaginator.paginator;
  }

  optionChange(event: KeyValuePair): void{
    let {key, value} = event;    
    switch(key){
      case 'HDD':
          this.hddValue = value.toString();
          break;
      case 'Location':
          this.locationValue = value.toString();
          break;
      case 'Storage':
          this.sliderIndex = +value;
          this.sliderActualValue = this.storageOptions[+value];
          break;
      case 'RAM':
          const ele = this.ramOptions[this.ramOptions.findIndex(f => f.key===value)]; 
          ele.value = !ele.value; 
          break;
    }
    this.filterChange();
  }

  filterChange(): void{
    let data = this.list;
    if(this.hddValue){      
      data = data.filter((f:Laptop) => f.HDD.includes(this.hddValue));
    }
    if(this.locationValue){
      data = data.filter((f:Laptop) => f.Location.includes(this.locationValue));
    }
    if(this.sliderIndex && this.sliderIndex!==0){      
      data = data.filter((f:Laptop) => f.HDD.includes(this.sliderActualValue));
    }
    const ram = this.ramOptions.filter(f => f.value).map(f => f.key);
    
    if(ram.length){
      data = data.filter((f:Laptop) => ram.some(r => f.ram === r));
    }
    
    this.filterList = data;
    this.dataSource.data = this.filterList;
  }
}
