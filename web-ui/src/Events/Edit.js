import { Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { edit_event, fetch_events, get_event } from '../api';


import flatpickr from "flatpickr";

function EditEvent({events, session }) {
	const location = useLocation();
	let history = useHistory();
	let id = parseInt(location.pathname.slice(-1));
	let prevEvent = get_event(events, id);

	const [event, setEvent] = useState(prevEvent);


	function submit(ev) {
		ev.preventDefault();

		edit_event(event.id, event).then(() => {
			history.push("/event/view/" + event.id);
			fetch_events();
		});
	}
	
	function updateBody(field, ev) {
		let event_edited = Object.assign({}, event);
		event_edited[field] = ev.target.value;
		setEvent(event_edited);
	}

	function updateDate(selectedDate, d, instance) {
		let event_edited = Object.assign({}, event);
		event_edited["date"] = d;
		setEvent(event_edited);
	}


	if (session) {
		//https://flatpickr.js.org/formatting/ & Piazza for the idea!
		window.addEventListener('load', () => {
			flatpickr('.flatpickr-datetime', {
				enableTime: true,
				dateFormat: "D, F J Y, H:i ",
				onChange: updateDate
			});
		});

		return (
			<Row>
				<Col>
					
					<h1>Edit Event</h1>
					<Form onSubmit={submit}>
						<Form.Group>
							<Form.Label>Event Title</Form.Label>
							<Form.Control type="text"
								onChange={(ev) => updateBody("event_title", ev)}
								value={event.event_title || ""} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Date</Form.Label>
							<Form.Control type="text"
								className="flatpickr-datetime"
								onChange={(ev) => updateDate("date", ev)}
								value={event.date || ""} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control onChange={(ev) => updateBody("body", ev)}
								value={event.body || ""} />
						</Form.Group>
						<Button variant="success"
							type="submit">
							Save Event
						</Button>
					</Form>
				</Col>
			</Row>
		);
	} else {
		return (
			<h4>Please sign in or sign up to edit this event</h4>
		);
	}
}

export default connect(({ events, session }) => ({ events, session }))(EditEvent);
