/**
 * Created by Valentin on 10.07.2016.
 */
export class Cell {
    private _isAlive:boolean;

    constructor(isAlive: boolean = false) {
        this._isAlive = isAlive;
    }

    get isAlive():boolean {
        return this._isAlive;
    }

    set isAlive(value:boolean) {
        this._isAlive = value;
    }
}