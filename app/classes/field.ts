/**
 * Created by Valentin on 10.07.2016.
 */
import {Cell} from './Cell';
export class Field {
	private _currentField:Cell[][];
	private _fieldSize:number = 20;

	constructor() {
		this.initField();
	}

	public initField():void {
		this._currentField = [];
		for (let l = 0; l < this._fieldSize; l += 1) {
			this._currentField[l] = [];
			for (let c = 0; c < this._fieldSize; c += 1) {
				this._currentField[l][c] = new Cell(Math.random() > 0.5);
			}
		}

		// this._currentField = [
		// 	[new Cell(),    new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
		// 	[new Cell(),    new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
		// 	[new Cell(),    new Cell(), new Cell(true), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
		// 	[new Cell(),    new Cell(true), new Cell(), new Cell(true), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
		// 	[new Cell(),    new Cell(true), new Cell(), new Cell(true), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
		// 	[new Cell(),    new Cell(), new Cell(true), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
		// 	[new Cell(),    new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
		// 	[new Cell(),    new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
		// 	[new Cell(),    new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()],
		// 	[new Cell(),    new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()]
		// ]
	}

	public get field():Cell[][] {
		return this._currentField.map(function (arr) {
			return arr.slice();
		});
	}

	public setNextGeneration():void {
		this._currentField = this._getFieldOfNextGeneration();
	}

	private _getAliveNeighboursForCell(line:number, column:number):number {
		let lStart = line > 0 ? line - 1 : 0;
		let cStart = column > 0 ? column - 1 : 0;

		let lEnd = line === this._fieldSize - 1 ? line : line + 1;
		let cEnd = column === this._fieldSize - 1 ? column : column + 1;

		let count = 0;

		for (let l = lStart; l <= lEnd; l += 1) {
			for (let c = cStart; c <= cEnd; c += 1) {
				if (l === line && c === column) continue;
				if (this._currentField[l][c].isAlive) count += 1;
			}
		}
		return count;
	}

	private _getNextStateForCell(cell:Cell, line:number, column:number):boolean {
		let nextState:boolean = false;
		let aliveNeighboursCount:number = this._getAliveNeighboursForCell(line, column);

		if (aliveNeighboursCount === 3) {
			nextState = true;
		} else {
			nextState = !!(aliveNeighboursCount > 1 && aliveNeighboursCount < 4 && cell.isAlive);
		}
		return nextState;
	}

	private _getFieldOfNextGeneration():Cell[][] {
		let nextField:Cell[][];
		nextField = [];
		for (let l = 0; l < this._fieldSize; l += 1) {
			nextField[l] = [];
			for (let c = 0; c < this._fieldSize; c += 1) {
				let nextCellState = this._getNextStateForCell(this._currentField[l][c], l, c);
				nextField[l][c] = new Cell(nextCellState);
			}
		}
		return nextField;
	}

}