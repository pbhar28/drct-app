import React, { Component } from 'react';

export class Footer extends Component {
	render(){
		return(
			<footer className="site__footer">
				<div className="site-footer__wrapper">
					<p className="footer__copy">{this.props.copytext}</p>
				</div>
			</footer>
		)
	}
}