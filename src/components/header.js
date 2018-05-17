import React, { Component } from 'react';

export class Header extends Component {
	render(){
		return(
			<header className="site__header">
				<div className="site-header__wrapper">
					<h1 className="site__title">{this.props.title}</h1>
				</div>
			</header>
		)
	}
}