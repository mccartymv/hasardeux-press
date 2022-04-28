import { Component, OnInit } from '@angular/core';
import { List } from '../list';
import { ListService } from '../list.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {

  scrapeTemplates;

  model = {
    scrapeFileLocation: '../scrape-files/',
    tagScrapeLocation: '../scrape-files/',
    scrapeJS: '',
    tagScrapeJS: ''
  };

  getScrapeTemplates(): void {
    this.listService.getScrapeTemplates()
      .subscribe(res => { this.model.scrapeJS = res.scrapeTemplate; this.model.tagScrapeJS = res.tagScrapeTemplate; });
  }

  submitList(formData) {
    const scrapeArray = [];

    scrapeArray.push(
      {
        name: formData.controls.scrapeName.value,
        description: formData.controls.scrapeDescription.value,
        location: formData.controls.scrapeFileLocation.value,
        inheritTagMethod: 'targetUrlScrape',
        tagScrapeLocation: formData.controls.tagScrapeLocation.value,
        active: 'true'
      }
    );

    this.listService.createList({
      name: formData.controls.name.value,
      contents: [],
      scrapes: scrapeArray,
      scrapeJS: formData.controls.scrapeJS.value,
      tagScrapeJS: formData.controls.tagScrapeJS.value
    }).subscribe();

  }



  constructor(private listService: ListService) { }

  ngOnInit() {
    this.getScrapeTemplates();
  }

}
