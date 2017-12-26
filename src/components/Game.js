import React, { Component } from 'react';
import Ball from './Ball';
import Player from './Player';

const defaultState = {
	board: {
		width: 1000,
		height: 600,
		color: '#848482'
	},

	ball: {
		position: {
			x: 50,
			y: 200
		},

		velocity: {
			x: 1,
			y: 1
		},

		size: {
			width: 20,
			height: 20
		}
	},

	player: {
		position: {
			x: 0,
			y: 50
		},

		velocity: {
			x: 0,
			y: 10
		},

		size: {
			width: 20,
			height: 100
		}
	}
};

const UP = 38;
const DOWN = 40;

export default class Game extends Component {
	constructor(props) {
		super(props);
		this.state = defaultState;
	}

	moveBall = () => {
		setInterval(
			() => {
				let {ball, player, board} = this.state;

				if(
					(
						ball.position.y > player.position.y - ball.size.height
						&& ball.position.y < ( player.position.y + player.size.height )
					)
					&& ball.position.x <= player.position.x + player.size.width
				) {
					ball.velocity.x = -ball.velocity.x;
				}

				if(ball.position.x >= board.width - ball.size.width) {
					ball.velocity.x = -ball.velocity.x;
				}

				if(ball.position.y <= 0 || ball.position.y >= board.height - ball.size.height) {
					ball.velocity.y = -ball.velocity.y;
				}

				if(ball.position.x <= 0) {
					// alert("You lost");
					this.setState(defaultState);
				} else {
					this.setState({
						ball: {
							velocity: ball.velocity,
							size: ball.size,
							position: {
								x: ball.position.x + ball.velocity.x,
								y: ball.position.y + ball.velocity.y
							}
						}
					});
				}
			},
			1
		);
	}

	movePlayer = (e) => {
		let {position, velocity, size} = this.state.player;
		let board = this.state.board;

		if(e.keyCode === UP && position.y - velocity.y >= 0) {
			this.setState({
				player: {
					position: {
						x: position.x,
						y: position.y - velocity.y
					},

					velocity: velocity,
					size: size
				}
			});
		}

		if(e.keyCode === DOWN && position.y + velocity.y + size.height <= board.height) {
			this.setState({
				player: {
					position: {
						x: position.x,
						y: position.y + velocity.y
					},

					velocity: velocity,
					size: size
				}
			});
		}
	}

	render() {
		let {board, player, ball} = this.state;

		let styles = {
			width: board.width,
			height: board.height,
			backgroundColor: board.color
		};

		return (
			<div style={ styles }>
				<Ball ball={ball} move={this.moveBall} />
				<Player player={player} move={this.movePlayer} />
			</div>
		);
	}
}
