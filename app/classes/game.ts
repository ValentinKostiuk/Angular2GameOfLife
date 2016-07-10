/**
 * Created by Valentin on 10.07.2016.
 */
import {Field} from './Field';
import {Cell} from './Cell';

export class Game {
	private _field:Field;
	private _timerId:number;
	private _renewInterval:number = 500;

	constructor() {
		this._field = new Field();
	}

	public get field():Cell[][] {
		return this._field.field;
	}

	public start():void {
		this._timerId = window.setInterval(() => this._field.setNextGeneration(), this._renewInterval);
	}

	public stop():void {
		window.clearInterval(this._timerId);
		this._timerId = null;
	}

	public reInit():void {
		if (this._timerId) {
			this.stop();
			this._field.initField();
			this.start();
		} else {
			this._field.initField();
		}
	}
}