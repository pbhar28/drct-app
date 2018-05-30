import React, { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { Modal } from './modals';
import { LocationOn, Today, Close } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';


class EventForm extends Component {
	
	constructor(props) {
		super(props)
		this.submit = this.submit.bind(this)
	}
	
	submit(e) {
		e.preventDefault()
		
		//console.log(this.refs.eventTitle.value);
		//console.log(this.refs.eventSummary.value); 
		//console.log(this.refs.eventLocation.value); 					
/* 		console.log(this.refs.eventTitle.value);
		console.log(this.refs.eventSummary.value); */
		
			

		var payload = 	{
		  "data": {
			"type": "node--event",
			"attributes": {
				"title": this.refs.eventTitle.value,
				"field_event_todate": "2018-05-28",
				"field_event_fromdate": "2018-05-28",
				"field_event_details": this.refs.eventSummary.value,
				"field_location": this.refs.eventLocation.value
			}
		  }
		}
		
		var data = JSON.stringify(payload);
		
		// Send a POST request
 		axios({
		  method: 'post',
		  url: 'http://localhost/dcportal/jsonapi/node/event',
		  headers: {
				'content-type':'application/vnd.api+json',
				'Accept':'application/vnd.api+json',
				'authorization':'Basic YWRtaW46YWRtaW4='
		  },
		  data: data
		})
		.then(res => {
			console.log(res);	
			this.setState({showAddModal: false});			
		});
		
/* 		axios({
		  method: 'post',
		  url: 'http://localhost/drupal/entity/node?_format=json',
		  headers: {
				'content-type':'application/json',
				'Accept':'application/json',
				'authorization':'Basic YWRtaW46YWRtaW4='
		  },
		  data: {
				"type":[{"target_id":"article", "target_type": 'node_type'}],
				"title":[{"value":"Hello World from react app"}],
				"body":[{"value":"How are you?"}]
			}
		})
		.then(res => {
				console.log(res);
				console.log(res.data);
					
		}); */
		
/* 		axios.post('http://localhost/drupal/entity/node?_format=json', {
			headers: {
				'content-type':'application/json',		
				'accept': 'application/json',
				'authorization':'Basic YWRtaW46YWRtaW4='
			},
			body: {
				"type":[{"target_id":"article", "target_type": 'node_type'}],
				"title":[{"value":"Hello World from react app"}],
				"body":[{"value":"How are you?"}]
			}
		})
		.then(res => {
				console.log(res);
				console.log(res.data);
		}); */

	}
	
	render() {
		
		const {eventTitle, eventSummary, eventFromDate, eventToDate} = this.props;
		
		return (
			<form className="event__form" onSubmit={this.submit}>
				<div>
					<label htmlFor="eventTitle">Event Name</label>
					<input  id="eventTitle" 
							type="text" 
							required 
							defaultValue={eventTitle} 
							ref="eventTitle" />
				</div>
				<div>
					<label htmlFor="eventSummary">Event Details</label>
					<input  id="eventSummary" 
							type="text" 
							required 
							defaultValue={eventSummary} 
							ref="eventSummary" />
				</div>
				<div>
					<label htmlFor="eventFromDate">Event Start date</label>
					<input  id="eventFromDate" 
							type="date"
							ref="eventFromDate" />
				</div>
				<div>
					<label htmlFor="eventToDate">Event End date</label>
					<input  id="eventToDate" 
							type="date"
							ref="eventToDate" />
				</div>
				<div>
					<label htmlFor="eventLocation">Event Location</label>
					<input  id="eventLocation" 
							type="text"
							ref="eventLocation" />
				</div>
				<button>Add Event</button>
			</form>
		)
	}
	
}

class DeleteConfirm extends Component {
	
	constructor(props) {
		super(props)
		this.submit = this.submit.bind(this)
	}
	
	submit(e) {
		e.preventDefault()

/* 		console.log(this.refs.eventTitle.value); */
/* 		console.log(this.refs.eventTitle.value);
		console.log(this.refs.eventSummary.value); */

		
			
		var payload = 	{
		  "data": {
			"type": "node--event",
			"attributes": {
				"title": this.refs.eventTitle.value,
				"field_event_end_date": "2018-05-06T08:48:03",
				"field_event_start_date": "2018-05-06T08:48:03",
				"field_event_summary": this.refs.eventSummary.value
			}
		  }
		}
		

		//var data = JSON.stringify(payload);
		
		// Send a POST request
/* 		axios({
			  method: 'delete',
			  url: 'http://localhost/drupal/jsonapi/node/event',
			  headers: {
					'content-type':'application/vnd.api+json',
					'Accept':'application/vnd.api+json',
					'authorization':'Basic YWRtaW46YWRtaW4='
			  },
			  data: data
			})
			.then(res => {
					console.log(res);
					console.log(res.data);				
			});
 */

		var data = JSON.stringify(payload);
		
		// Send a POST request
/*  	axios({
		  method: 'post',
		  url: 'http://localhost/drupal/jsonapi/node/event',
		  headers: {
				'content-type':'application/vnd.api+json',
				'Accept':'application/vnd.api+json',
				'authorization':'Basic YWRtaW46YWRtaW4='
		  },
		  data: data
		})
		.then(res => {
				console.log(res);
				console.log(res.data);				
		}); */
	}
	
	render() {
		
		const {eventTitle} = this.props;
		console.log(this);

		return (
			
			<div>
				<p>Are you sure you want to remove {eventTitle} event?</p>
				<button onClick={this.submit}>Yes</button>
				<button>No</button>
			</div>
		)
	}
	
}

EventForm.defaultProps = {
	eventTitle: "Dummy event title",
	eventSummary: "Dummy description",
	eventFromDate:"2018-05-28",
	eventToDate: "2018-05-28"

}


export class EventsContainer extends Component {
		
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      events: [],
	  showModal: false	  
    };
	this.openAddModal = this.openAddModal.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
	this.openDeleteModal = this.openDeleteModal.bind(this);
  }

	openAddModal() {
		this.setState({showAddModal: true});
	}
  
	closeAddModal() {
		this.setState({showAddModal: false});
		this.setState({showDeleteModal: false});
	}
	
	openDeleteModal() {
		this.setState({showDeleteModal: true});
	}
  
  componentDidMount() {
 
    fetch("http://localhost/dcportal/api/view/events?_format=json")
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

	//console.log('isLoaded ', isLoaded);
	//console.log('error ', error);
	console.log('events ', events);
	
	// Show a Modal on click.
    // (In a real app, don't forget to use ARIA attributes
    // for accessibility!)
    const modal = (this.state.showAddModal || this.state.showDeleteModal) ? (
      <Modal>
        <div className="modal">
					
		<div className="modal__form-container">	
			<button className="modal__btn-close" onClick={this.closeAddModal}>Close</button>
			{this.state.showAddModal ? <EventForm /> : null}
			{this.state.showDeleteModal ? <DeleteConfirm /> : null}
		</div>  
        

        </div>
      </Modal>
    ) : null;
	
	const drupalPath = "http://localhost";
	
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading events...</div>;
    } else {
      return (
		<div>
			<div className="event__btn-add_container">
				<Button className="event__item-add" variant="fab" color="primary" aria-label="add" onClick={this.openAddModal}>
					<AddIcon />
				</Button>
			</div>
			
			<section className="events__container">
				{events.map(item => (
					<div className='event items--row' key={item.index}>
						<div className="event__images">
							<img src={drupalPath + item.field_event_pictures} alt="" /> 
						</div>
						<div className="event__info">
							<h3 className="event__title">{item.title}</h3> 
							<div>
								<Today />
								<div className="event__date">
									<span>
										<Moment format="MMM DD">
											{item.field_event_fromdate}
										</Moment>
									</span>
									-
									<span>
										<Moment format="MMM DD">
											{item.field_event_todate}
										</Moment>
									</span>	
								</div>
								<div className="event__location">
									<LocationOn /><span>{item.field_location}</span>
								</div>
							</div>
							<p>{item.field_event_details}</p>
							<Button data-item-id={item.uuid} className="event__item-delete" variant="raised" color="secondary" onClick={this.openDeleteModal}>
								Delete
							</Button>
						</div>

					</div>
				))}
			</section>
			{modal}
		</div>
      )
    }
  }
  
}