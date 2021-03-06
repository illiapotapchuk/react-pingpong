import React, { Component } from 'react';

export default class Ball extends Component {
	render() {
		let {position, size} = this.props.ball;

		let styles = {
			width: size.width,
			height: size.height,
			backgroundColor: 'yellow',
			position: 'absolute',
			top: position.y,
			left: position.x
		};

		return (
			<div style={ styles }/>
		);
	}
}
