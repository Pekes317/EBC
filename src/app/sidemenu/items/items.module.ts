import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ItemsPage } from './items.page';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: ItemsPage }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [ItemsPage],
})
export class ItemsPageModule {}