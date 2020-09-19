import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageListsComponent } from './manage-lists/manage-lists.component';
import { ManageScrapesComponent } from './manage-scrapes/manage-scrapes.component';
import { ProductTemplatesComponent } from './product-templates/product-templates.component';
import { ManageSettingsComponent } from './manage-settings/manage-settings.component';
import { UploadComponent } from './upload/upload.component';


const routes: Routes = [
  { path: 'lists', component: ManageListsComponent },
  { path: 'scrapes', component: ManageScrapesComponent },
  { path: 'product-templates', component: ProductTemplatesComponent },
  { path: 'settings', component: ManageSettingsComponent },
  { path: 'upload', component: UploadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
