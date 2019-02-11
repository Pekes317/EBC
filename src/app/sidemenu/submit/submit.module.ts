import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from './components/components.module';
import { SubmitPage } from './submit.page';
import { SharedModule } from '../../shared/shared.module';
import { FormStoreModule } from '../../state/form-store/form-store.module';

const routes: Routes = [
  {
    path: '',
    component: SubmitPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    FormStoreModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [SubmitPage],
})
export class SubmitPageModule {}