import { Row, Col, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useLocation, useHistory } from "react-router-dom";
import CreateComment from '../Comments/New';
import ViewComments from '../Comments/View';
import CreateInvite from '../Invites/New';
import ViewInvites from '../Invites/View';
import Response from '../Invites/RSVP';
import { get_event } from '../api';



function is_invited(event, user) {
	for (var i = 0; i < event.invites.length; i++) {
		if ( user.email === event.invites[i].email) {
			return true;
		}
	}

	return false;
}

function get_invite(event, user) {
	for (var i = 0; i < event.invites.length; i++) {
		if (user.email === event.invites[i].email) {
			return event.invites[i];
		}
	}

	return null;
}

function SingleEvent({events, session}) {
	
	const location = useLocation();
	let history = useHistory();
	let id = parseInt(location.pathname.slice(-1));
	let event = get_event(events, id);
	

	if (session) {

		let typeOfInvite = null;
		let editbtn = null;
		let comments = null;
		if (event.user.id === session.user_id) {
			typeOfInvite = (<CreateInvite event_id={event.id} />);
			editbtn = (<Button variant="success" onClick={editEventRoute}>Edit Event</Button>)
			comments = (<CreateComment event_id={event.id}></CreateComment>)
		} else {
			if (is_invited(event, session)) {
				let invite = get_invite(event, session);
				typeOfInvite= (<Response invite={invite} />);
				comments = (<CreateComment event_id={event.id}></CreateComment>)
			}
			else {
				typeOfInvite = <h3><b>You were not invited to this event :(</b></h3>
			}
		}

		let going = 0;
        let interested = 0;
		let not_going = 0;
		let nr = 0;
		event.invites.map((invite) => {
			switch (invite.response) {
				case 'Going':
					going += 1 ;
					break;
                case 'Interested':
					interested += 1;
					break;
				case 'Not Going':
					not_going += 1;
					break;
				default:
					nr += 1;
					break;
			}
			return null;
		});

		function editEventRoute() {
			history.push("/event/edit/" + event.id);
			history.go(0);
		}

		return(
			<Container>
                <br></br>
                <br></br>
				<Row>
					<Col>
						<h2>Event Details</h2>
					</Col>
					<Col>
						{editbtn}
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="event-details">
							<em>Event Name:</em> {event.event_title}
							<br></br>
							<em>Event Date:</em> {event.date}
							<br></br>
							<em>Event Description:</em> {event.body}
							<br></br>
							<em>Event Organizer:</em> {event.user.name}
						</div>
					</Col>
				</Row>
				<br />
				<Row>
					<h2>Check out who has responded so far:</h2>
                    </Row>
					<Row>
					<div>
						<div className="going">{going + " are going" }</div>
						<div className="interested">{interested + " are interested" }</div>
						<div className="cant-go">{not_going + " can't make it" }</div>
						<div className="no-response">{nr + " still pending response" }</div>
						<div> {going + interested + not_going + nr +" have been invited" }</div>
						<br></br>
					</div>
					
				</Row>
				{ typeOfInvite }
				<ViewInvites event={event} />
				<br></br>
				<ViewComments event={event} session={session} />
				{comments}
			</Container>
		);
	} else {
		return(
				<h4>Oops! You can't be here. Login or sign-up.</h4>
		);
	}
}

export default connect(({events, session}) => ({events, session}))(SingleEvent);