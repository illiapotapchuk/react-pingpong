import React, { Component } from 'react';

export default class Score extends Component {

	render() {

		let {width, height, color, player, opponent} = this.props.score;

		let styles = {
            wrapper: {
                width: width,
                height: height,
                backgroundColor: color,
                position: 'absolute',
                display: 'table'
            },

            insideWrapper: {
                textAlign: 'center',
                display: 'table-cell',
                verticalAlign: 'middle',
                color: 'white',
                fontFamily: 'Bookman Old Style',
                fontSize: 30,
                fontWeight: 800
            },

            scoreSpan: {
                margin: '0 15% 0 15%'
            }

		};

		return (
			<div style={ styles.wrapper }>
                <div style={ styles.insideWrapper }>
                    <span>{player}</span>
                    <span style={ styles.scoreSpan }>SCORE</span>
                    <span>{opponent}</span>
                </div>
            </div>
		);
	}
}
