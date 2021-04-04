import { Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useState } from 'react';
import { create_event, fetch_events } from '../api';
import { useHistory } from 'react-router-dom';


import flatpickr from "flatpickr";

function EventsNew({ session }) {
	let history = useHistory();

	const [event, setEvent] = useState({
		name: "",
		date: "",
		body: ""
	});

	function submit(ev) {
		ev.preventDefault();
		create_event(event).then(() => {
			history.push("/");
			fetch_events();
		});
	}

	function updateBody(field, ev) {
		let event_made = Object.assign({}, event);
		event_made[field] = ev.target.value;
		setEvent(event_made);
	}


	function updateDate(selectedDate, d, instance) {
		let newEvent = Object.assign({}, event);
		newEvent["date"] = d;
		setEvent(newEvent);
	}


	if (session) {
		// https://flatpickr.js.org/formatting/ & Piazza for the idea!
		window.addEventListener('load', () => {
			flatpickr('.flatpickr-datetime', {
				enableTime: true,
				dateFormat: "D, F J Y, H:i",
				onChange: updateDate
			});
		});

		return (
			<Row>
				<Col>
					<h1>New Event</h1>
					<Form onSubmit={submit}>
						<Form.Group>
							<Form.Label>Date</Form.Label>
							<Form.Control type="text"
								className="flatpickr-datetime" />
						</Form.Group>
						<Form.Group>
							<Form.Label>Event Title</Form.Label>
							<Form.Control type="text"
								onChange={(ev) => updateBody("event_title", ev)}
								value={event.event_title || ""} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control onChange={(ev) => updateBody("body", ev)}
								value={event.body || ""} />
						</Form.Group>
						<br />
						<Button variant="success"
							type="submit">
							Create
						</Button>
					</Form>
				</Col>
			</Row>
		);
	} else {
		return (
			<Row>
				<h4>Please sign in or signup to create a new event.</h4>
			</Row>
		);
	}
}

export default connect(({ session }) => ({ session }))(EventsNew);