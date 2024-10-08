import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {AvatarModule} from "primeng/avatar";
import {Select} from "@ngxs/store";
import {AuthState} from "../../../auth/state/auth-state";
import {Observable} from "rxjs";
import {ProfileModel} from "../../../auth/models/profileModel.interface";

@Component({
  selector: 'app-avatar-profile',
  standalone: true,
    imports: [
        AsyncPipe,
        AvatarModule,
        NgIf
    ],
  templateUrl: './avatar-profile.component.html',
  styleUrl: './avatar-profile.component.scss'
})
export class AvatarProfileComponent implements OnInit{


  @Input() size : 'normal' | 'large' | 'xlarge' | undefined ;

  @Select(AuthState.profile) profile$!: Observable<ProfileModel> ;
  avatarLabel : string | null = null;

  ngOnInit(): void {
    this.profile$.subscribe(profile => {
      if(profile) this.avatarLabel = profile.fullname.substring(0,1);
    });
  }

}
