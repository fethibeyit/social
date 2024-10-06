import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PostListComponent} from "./pages/list/post-list.component";

const routes: Routes = [
  {
    path: "",
    component: PostListComponent,
  },
  {
    path: "form",
    children: [
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule { }
