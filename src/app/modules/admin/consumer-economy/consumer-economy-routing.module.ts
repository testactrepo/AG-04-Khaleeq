import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphComponentComponent } from './graph-component/graph-component.component';

const routes: Routes = [
  { path: 'graph', component: GraphComponentComponent },
  { path: '', redirectTo: 'graph', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerEconomyRoutingModule { }
