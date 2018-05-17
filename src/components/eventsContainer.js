import React, { Component } from 'react';
import Moment from 'react-moment';
import { Modal } from './modals';
import { LocationOn, Today } from '@material-ui/icons';


class EventForm extends Component {
	
	constructor(props) {
		super(props)
		this.submit = this.submit.bind(this)
	}
	
	submit(e) {
		e.preventDefault()
		console.log(this.refs.eventTitle.value);
		console.log(this.refs.eventSummary.value);
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
					<label htmlFor="eventSummary">Event Summary</label>
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
							required 
							ref="eventFromDate" />
				</div>
				<div>
					<label htmlFor="eventToDate">Event End date</label>
					<input  id="eventToDate" 
							type="date"
							ref="eventToDate" />
				</div>
				<button>Add Event</button>
			</form>
		)
	}
	
}

EventForm.defaultProps = {
	eventTitle: "Sample Form event title",
	eventSummary: "",
	eventFromDate:"05-16-2018",
	eventToDate: "05-16-2018",
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
	this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

	handleShow() {
		this.setState({showModal: true});
	}
  
	handleHide() {
		this.setState({showModal: false});
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
	console.log('isLoaded ', isLoaded);
	console.log('error ', error);
	console.log('events ', events);
	
	// Show a Modal on click.
    // (In a real app, don't forget to use ARIA attributes
    // for accessibility!)
    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal">
          <button onClick={this.handleHide}>Hide modal</button>
		  <div>
            <p>With a portal, we can render content into a different
            part of the DOM, as if it were any other React child.
			This is being rendered inside the #modal-container div.</p>
			
			<EventForm />

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
		<section className="events__container">
			{events.map(item => (
				<div className='event items--row' key={item.field_event_name_1}>
					<div className="event__images">
						<img src={drupalPath + item.field_event_pictures} alt="" /> 
					</div>
					<div className="event__info">
						<h3 className="event__title">{item.field_event_name_1}</h3> 
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
					</div>

				</div>
			))}
		</section>
		This div has overflow: hidden.
        <button onClick={this.handleShow}>Show modal</button>
        {modal}
		</div>
      )
    }
  }
  
}