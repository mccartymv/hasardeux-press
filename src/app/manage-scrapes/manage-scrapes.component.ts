import { Component, OnInit } from '@angular/core';
import { List } from '../list';
import { ListService } from '../list.service';

@Component({
  selector: 'app-manage-scrapes',
  templateUrl: './manage-scrapes.component.html',
  styleUrls: ['./manage-scrapes.component.css']
})
export class ManageScrapesComponent implements OnInit {

  lists: List[];

  getLists(): void {
    this.listService.getLists()
      .subscribe(lists => this.lists = lists);
  }

  scrapeInputUrl(listId: string, scrapeLocation: string, scrapeUrl: string): void {
    // window.alert(list_id + ', ' + scrapeName + ', ' + scrapeUrl);
    if (!scrapeUrl) { return; }
    this.listService.scrapeInputUrl({ listId, scrapeLocation, scrapeUrl })
        .subscribe();
  }

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.getLists();
  }

}
