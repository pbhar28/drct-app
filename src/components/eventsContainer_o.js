import React from 'react';
import ReactDOM from 'react-dom'; 
import Moment from 'react-moment';

class EventsContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			events: []
		};
	}
  
	componentDidMount() {
		fetch('http://localhost/dcportal/api/view/events?_format=json')
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					events: result
				});
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)
	}
	
	render() {
		const { error, isLoaded, events } = this.state;
		//console.log(error);
		//console.log(isLoaded);
		/*	<div contentEditable='true' dangerouslySetInnerHTML={{ __html: "<h1>free</h1>" }}></div>
				<div>							
					{events[0].field_event_name_1}<br/>
					{events[0].field_event_details}
				</div>*/
		console.log(events);
		var image_path = 'http://' + window.location.hostname + ':80';
		if (error) {
		  return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
		  return <div>Loading...</div>;
		} else {
			return (
				<section className='events-container'>				  
					  {events.map(item => (
						<div key={item.field_event_name_1} className='event'>
							<img className='event__image' src="./images/Desert.jpg" src={image_path + item.field_event_pictures} />
							<div>
								<h2 className='event-title'>{item.field_event_name_1}</h2>
								<span>
									<Moment format="MMM DD">
										{item.field_event_fromdate}
									</Moment>
								</span>
								&nbsp;-&nbsp;
								<span>
									<Moment format="MMM DD">
										{item.field_event_todate}
									</Moment>
								</span>																		
							</div>
							<p className='event-summary'>{item.field_event_details}</p>
						</div>
					  ))}
				</section>
			);
		}
	}
}