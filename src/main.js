import React from 'react';
import ReactDOM from 'react-dom'; 

import { Header } from './components/header';
import { EventsContainer } from './components/eventsContainer';
import { Footer } from './components/footer';
import './styles/styles.css'; 

const appRoot = document.getElementById('root');

ReactDOM.render(
	<React.Fragment>
		<Header title='DC Events' />
		<EventsContainer />
		<Footer copytext='Infosys &copy; 2018' />
	</React.Fragment>,
	appRoot
)



