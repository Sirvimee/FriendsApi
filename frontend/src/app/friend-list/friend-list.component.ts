import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Friend } from '../models/friend';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {


  friends!: Friend[];
  closeResult?: string;

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getFriends();
  }
  getFriends(){
    this.httpClient.get<any>('http://localhost:8083/friends').subscribe(
      response => {
        this.friends = response;
      }
    );
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    const url = 'http://localhost:8083/friends/addnew';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }
}
