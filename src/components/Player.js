import React, { Component } from 'react';

export default class Player extends Component {
	componentDidMount() {
		document.getElementById("board").addEventListener('keydown', this.props.move);
		document.getElementById("board").addEventListener('mousemove', this.props.drag);
		document.getElementById("board").addEventListener('mousedown', this.props.dragStart);
		document.getElementById("board").addEventListener('mouseup', this.props.dragEnd);
	}

	render() {
		let {position, size} = this.props.player;

		let styles = {
			width: size.width,
			height: size.height,
			backgroundColor: 'white',
			position: 'absolute',
			top: position.y,
			left: position.x
		};

		return (
			<div
				style={ styles }
			/>
		);
	}
}
