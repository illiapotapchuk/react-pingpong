import React, { Component } from 'react';
import Ball from './Ball';
import Player from './Player';
import Opponent from './Opponent';
import Score from './Score';

const getDefaultState = () => {
	let speed = 2;
	let xVelocity = +(speed - Math.random() * speed/2).toFixed(2);
	let yVelocity = +(speed - xVelocity).toFixed(2);

	if(Math.round(Math.random())) {
		yVelocity = -yVelocity;
	}

	return {
		started: false,
		score: {
			height: 75,
			color: '#3B444B',
			player: 0,
			opponent: 0
		},

		board: {
			width: 500,
			height: 300,
			color: '#848482'
		},

		ball: {
			position: {
				x: 240,
				y: 140
			},

			velocity: {
				x: xVelocity,
				y: yVelocity
			},

			size: {
				width: 10,
				height: 10
			},

			speed: speed
		},

		player: {
			position: {
				x: 0,
				y: 25
			},

			velocity: {
				x: 0,
				y: 10
			},

			size: {
				width: 10,
				height: 50
			},

			dragging: false
		},

		opponent: {
			position: {
				x: 490,
				y: 25
			},

			size: {
				width: 10,
				height: 50
			}
		}
	};
}

const UP = 38;
const DOWN = 40;
const SPACE = 32;

export default class Game extends Component {
	constructor(props) {
		super(props);
		this.state = getDefaultState();
	}

	componentDidMount() {
		window.addEventListener('keypress', this.startGame);
	}

	startGame = (e) => {
		if(e.keyCode === SPACE && !this.state.started) {
			this.setState({started: true});
			this.moveBall();
		}
	}

	moveBall = () => {
		if(this.state.started) {
			let timerID = setInterval(
				() => {
					let {ball, player, board, opponent, score} = this.state;

					if(
						(
							ball.position.y > player.position.y - ball.size.height
							&& ball.position.y < ( player.position.y + player.size.height )
						)
						&& ball.position.x <= player.position.x + player.size.width
					) {

						let hitCoordinate = Math.round(ball.position.y + ball.size.height - player.position.y);
						let centerOfHitSurface = (ball.size.height + player.size.height) / 2;
						let pixelsFromCenter = hitCoordinate - centerOfHitSurface;

						let newY = +(pixelsFromCenter * ball.speed/2) / centerOfHitSurface;

						ball.velocity = {
							x: +(ball.speed - Math.abs(newY)).toFixed(2),
							y: newY
						};
					}

					if(
						(
							ball.position.y > opponent.position.y - ball.size.height
							&& ball.position.y < ( opponent.position.y + opponent.size.height )
						)
						&& ball.position.x >= opponent.position.x - opponent.size.width
					) {
						ball.velocity.x = -ball.velocity.x;
					}

					if(ball.position.y <= 0 || ball.position.y >= board.height - ball.size.height) {
						ball.velocity.y = -ball.velocity.y;
					}

					if(ball.position.x <= -ball.size.width) {
						score.opponent++;
						this.setState({
							started: false,
							score: score,
							ball: getDefaultState().ball,
						});
						clearInterval(this.state.timerID);
					} else if(ball.position.x >= board.width) {
						score.player++;
						this.setState({
							started: false,
							score: score,
							ball: getDefaultState().ball,
						});
					} else {
						ball.position = {
							x: ball.position.x + ball.velocity.x,
							y: ball.position.y + ball.velocity.y
						}

						this.setState({ball});
					}
				},
				1
			);

			this.setState({timerID});
		}
	}

	onDragPlayer = (e) => {
		let {player, board, score} = this.state;
		if(player.dragging) {
			player.position.y = e.pageY - player.size.height/2 - score.height;
			if(player.position.y < 0) {
				player.position.y = 0;
			} else if(player.position.y > board.height - player.size.height) {
				player.position.y = board.height - player.size.height;
			}

			this.setState({player});
		}
	}

	onPlayerDragStart = () => {
		let player = this.state.player;
		player.dragging = true;
		this.setState({player});
	}

	onPlayerDragEnd = () => {
		let player = this.state.player;
		player.dragging = false;
		this.setState({player});
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

	moveOpponent = () => {
		setInterval(
			() => {
				let {ball, opponent, board} = this.state;

				opponent.position.y = ball.position.y - (opponent.size.height/2 - ball.size.height/2);

				if(opponent.position.y < 0) {
					opponent.position.y = 0;
				} else if(opponent.position.y > board.height - opponent.size.height) {
					opponent.position.y = board.height - opponent.size.height;
				}

				this.setState({
					opponent: {
						position: {
							x: opponent.position.x,
							y: opponent.position.y
						},
						size: opponent.size
					}
				});
			},
			10
		);
	}

	render() {
		let {board, player, ball, opponent, score} = this.state;
		score.width = board.width;
		let styles = {
			width: board.width,
			height: board.height,
			backgroundColor: board.color,
			position: 'absolute',
			top: score.height
			// borderWidth: 3,
			// borderColor: 'green',
			// borderStyle: 'solid'
		};

		return (
			<div>
				<Score score={score} />
				<div style={ styles }>
					<Ball
						ball={ball}
					/>
					<Player
						player={player}
						move={this.movePlayer}
						dragStart={this.onPlayerDragStart}
						drag={this.onDragPlayer}
						dragEnd={this.onPlayerDragEnd}
					/>
					<Opponent opponent={opponent} move={this.moveOpponent} />
				</div>
			</div>
		);
	}
}
