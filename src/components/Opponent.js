import React, { Component } from 'react';

export default class Opponent extends Component {
	componentDidMount() {
		this.props.move();
	}

	render() {
		let {position, size} = this.props.opponent;

		let styles = {
			width: size.width,
			height: size.height,
			backgroundColor: 'black',
			position: 'absolute',
			top: position.y,
			left: position.x
		};

		return (
			<div style={ styles }/>
		);
	}
}
