import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PostListComponent} from "./pages/list/post-list.component";
import {FormComponent} from "./pages/form/form.component";
import {FormGuard} from "../core/guards/form.guard";

const routes: Routes = [
  {
    path: "",
    component: PostListComponent,
  },
  {
    path: "form",
    children: [
      {
        path: "",
        component: FormComponent,
        canDeactivate: [FormGuard]
      },
      {
        path: ":id",
        component: FormComponent,
        canDeactivate: [FormGuard]
      }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule { }
