import { Component, OnInit } from '@angular/core';

import { List } from './../list';
import { ListService } from '../list.service';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  lists: List[];

  uploadListView = false;
  currentUploadList;

  getLists(): void {
    this.listService.getLists()
      .subscribe(lists => this.lists = lists);
  }

  uploadListSelect(list) {
    console.log(list);
    this.uploadListView = true;
    this.currentUploadList = list;


  }






  constructor(private listService: ListService) { }

  ngOnInit() {
    this.getLists();
  }

}
