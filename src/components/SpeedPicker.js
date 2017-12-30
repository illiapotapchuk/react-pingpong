import React, { Component } from 'react';

export default class SpeedPicker extends Component {

	render() {

		let styles = {
            picker: {
                width: 10,
                height: 10,
                backgroundColor: 'green',
                diplay: 'inline-block'
            }
		};

		return (
			<div>
                <div>SPEED</div>
                <div>
                    <div style={styles.picker} onClick={() => this.props.changeSpeed(1)} />
                </div>
            </div>
		);
	}
}
