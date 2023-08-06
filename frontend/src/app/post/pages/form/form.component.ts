import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormActions} from "../../enums/form-actions.enum";
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/post.interface";
import {TableActions} from "../../enums/table-actions.enum";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  id = "";
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  formAction(data: {value: any; action: FormActions}) {
    if(data.action === FormActions.Create){
      console.log(data.value);
      this.http.post("http://localhost:8080/api/posts", data.value)
        .subscribe({
          next : value => {
            console.log(value);
            this.router.navigate((["posts"]))
          }
        })
    } else{
      console.log(data.value);
      this.http.put("http://localhost:8080/api/posts/" + data.value.id , data.value)
        .subscribe({
          next : value => {
            console.log(value);
            this.router.navigate((["posts"]))
          }
        })
    }
  }
}
