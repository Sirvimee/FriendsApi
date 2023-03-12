import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {FriendListComponent} from "./friend-list/friend-list.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'friends', component: FriendListComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
