import {Component} from '@angular/core';
import {Game} from '../classes/Game';
import {Cell} from '../classes/Cell';

@Component({
	selector: 'gameOfLife-app',
	templateUrl: './app/components/views/app.component.html',
	styleUrls: ['./app/components/views/styles/app.component.css']
})

export class GameOfLifeComponent {
	private _game:Game;
	
	constructor() {
		this._game = new Game();
	}
	
	public get field():Cell[][] {
		return this._game.field;
	}

	public handleStartGame():void {
		this._game.start();
	}

	public handleStopGame():void {
		this._game.stop();
	}

	public handleRestartGame():void {
		this._game.reInit();
	}
}