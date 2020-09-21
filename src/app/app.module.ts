import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageListsComponent } from './manage-lists/manage-lists.component';
import { ManageScrapesComponent } from './manage-scrapes/manage-scrapes.component';
import { ProductTemplatesComponent } from './product-templates/product-templates.component';
import { ManageSettingsComponent } from './manage-settings/manage-settings.component';
import { FormsModule } from '@angular/forms';
import { CreateListComponent } from './create-list/create-list.component';
import { UploadComponent } from './upload/upload.component';


@NgModule({
   declarations: [
      AppComponent,
      ManageListsComponent,
      ManageScrapesComponent,
      ProductTemplatesComponent,
      ManageSettingsComponent,
      CreateListComponent,
      UploadComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      CodemirrorModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
