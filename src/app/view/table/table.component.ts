import { Component, EventEmitter, Input, Output } from '@angular/core';

export enum Align{
  LEFT = 'Left',
  RIGHT = 'Right',
  CENTER = 'Center'
}

export interface Buttons{
  icon: string,
	color?: ClassColor,
  return: string,
  title: string,
}

export enum ClassColor{
	BLUE = 'colorBlue',
	GREEN = 'colorGreen',
	ORANGE = 'colorOrange',
	RED = 'colorRed',
	YELLOW = 'colorYellow'
}

export const buttonAlert : Buttons = {icon: 'pi pi-exclamation-triangle', return: 'plus', title:'ADD', color: ClassColor.YELLOW}
export const buttonDelete : Buttons = {icon: 'pi pi-trash', return: 'remove', title:'DELETE', color: ClassColor.RED}
export const buttonFilter : Buttons = {icon: 'pi pi-filter', return: 'remove', title:'DELETE', color: ClassColor.BLUE}
export const buttonMinus : Buttons = {icon: 'pi pi-minus-circle', return: 'minus', title:'REMOVE', color: ClassColor.BLUE}
export const buttonPlus : Buttons = {icon: 'pi pi-plus-circle', return: 'plus', title:'ADD', color: ClassColor.BLUE}
export const buttonUpdate : Buttons = {icon: 'pi pi-pencil', return: 'update', title:'UPDATE', color: ClassColor.BLUE}
export const buttonView : Buttons = {icon: 'pi pi-eye', return: 'view', title: 'VIEW', color: ClassColor.BLUE} 

export interface TableFields{
  field: string;
  header: string;
  width: string;
  align: Align;
  type: Types;
  filter?: boolean;
  buttonValues?: Buttons[];
}

export enum Types{
	ALERT = 'Alert',
  BUTTON = 'Button',
  CURRENCY = 'Currency',
  DATE = 'Date',
  MONTHYEAR = 'MonthYear',
  NUMBER = 'Number',
  ORIGINALTEXT = 'OriginalText',
  PROGRESSBAR = 'ProgressBar',
  STATUS = 'Status',
  TEXT = 'Text'
}

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})

export class TableComponent {
	@Output() buttonEmiter = new EventEmitter<any>;

	@Input() colTable: TableFields[] = []; 
	@Input() dataTable: any[] = []; 

	first: number = 0;

	onClick(item: any, type: string){
		const value = {item: item, type: type};
		this.buttonEmiter.emit(value);
	}
  
}
