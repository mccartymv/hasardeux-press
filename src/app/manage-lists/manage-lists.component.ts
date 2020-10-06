import { Component, OnInit } from '@angular/core';
import { List } from '../list';
import { ListService } from '../list.service';

@Component({
  selector: 'app-manage-lists',
  templateUrl: './manage-lists.component.html',
  styleUrls: ['./manage-lists.component.css']
})
export class ManageListsComponent implements OnInit {

  listInspectorView = false;
  listCreationView = false;
  listUnderInspection;
  editListView = false;

  lists: List[];

  inspectList(list) {
    this.listUnderInspection = list;
    this.listInspectorView = true;
  }

  exitInspectListView() {
    this.listInspectorView = false;
    this.editListView = false;
    this.getLists();
  }

  exitEditListView() {
    this.listInspectorView = true;
    this.editListView = false;
    this.getLists();
  }

  createNewList() {
    this.listCreationView = true;
  }

  getLists(): void {
    this.listService.getLists()
      .subscribe(lists => this.lists = lists);
  }

  countHasBeenTagged(contents) {
    let counter = 0;
    for (const listItem of contents) {
      if (listItem.hasBeenTagged === true) {
        ++counter;
      }
    }
    return counter;

  }

  editList() {
    this.editListView = true;

  }

  deleteListItem(index) {
    // console.log(index);
    this.listUnderInspection.contents.splice(index, 1);
  }

  addListItem(index, parentObj) {
    // console.log(parentObj);
    const newObj = JSON.parse(JSON.stringify(parentObj));
    newObj.id = '';
    this.listUnderInspection.contents.splice(index + 1, 0, newObj);
  }

  updateListContents() {
    // console.log(this.listUnderInspection.contents[0]);
    const resObj = {
      contents : this.listUnderInspection.contents,
      listId : this.listUnderInspection._id
    };
    this.listService.updateListContents(resObj)
      .subscribe(() => {
        this.listInspectorView = true;
        this.editListView = false;
        this.getLists();
      });
  }



  getOwnPropertyNames(obj) {
    return Object.getOwnPropertyNames(obj);
  }

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.getLists();
  }

}
