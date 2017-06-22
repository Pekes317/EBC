import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NavModule } from '../shared/nav';
import { SubmitPage } from './submit.page';
import { SubmitConfirm } from './submit-confirm.modal';
import { FormBase } from './forms/submit-base.form';
import { PicForm } from './forms/submit-pic.form';
import { SampleForm } from './forms/submit-sample.form';
import { SelectForm } from './forms/submit-select.form';
import { SocialForm } from './forms/submit-social.form';

@NgModule({
	declarations: [
		FormBase,
		PicForm,
		SampleForm,
		SelectForm,
		SocialForm,
		SubmitConfirm,
		SubmitPage
	],
	imports: [
		IonicPageModule.forChild(SubmitPage),
		NavModule
	],
	entryComponents: [
		SubmitConfirm,
		SubmitPage
	]
})
export class SubmitModule { }