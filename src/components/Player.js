import React, { Component } from 'react';

export default class Player extends Component {
	componentDidMount() {
		window.addEventListener('keydown', this.props.move);
		window.addEventListener('mousemove', this.props.drag);
		window.addEventListener('mousedown', this.props.dragStart);
		window.addEventListener('mouseup', this.props.dragEnd);
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
