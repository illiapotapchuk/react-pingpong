import React, { Component } from 'react';

export default class Ball extends Component {

	componentDidMount() {
		this.props.move();
	}

	render() {

		let {position, velocity, size} = this.props.ball;

		let styles = {
			width: size.width,
			height: size.height,
			backgroundColor: 'red',
			position: 'absolute',
			top: position.y,
			left: position.x
		};

		return (
			<div style={ styles }/>
		);
	}
}
