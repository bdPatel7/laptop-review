import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list.component';
import { ListResolver } from './resolver/list.resolver';

const routes: Routes = [
  {
    path:'',
    component:ListComponent,
    resolve:{
      data: ListResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
