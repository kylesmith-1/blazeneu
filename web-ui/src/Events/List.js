import { Row, Container, Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { delete_event } from '../api';

function Event({ event, session }) {
    let deleteEvent = null;
    let edit = null;
    let show = null;
    let history = useHistory();

    if (event.user.id === session.user_id) {
        edit = (
            <Button variant="info" onClick={edit_Event}>Edit Event</Button>
        );
        deleteEvent = (
            <Button variant="danger" onClick={() => delete_event(event.id)}>Delete Event</Button>
        );
    }

    function showEvent() {
        history.push("/event/view/" + event.id);
    }

    function edit_Event() {
        history.push("/event/edit/" + event.id);
        history.go(0);
    }

    show = (
        <Button className="show-btn" variant="primary" onClick={showEvent}> Show</Button>
    );


    return (
        <Card style={{ width: '16rem' }}>
            <Card.Body>
                <Card.Title>{event.event_title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{event.date}</Card.Subtitle>
                <Card.Text>
                    <i>About this event: </i>
                    <br></br>
                    {event.body}
                </Card.Text>
                <p>Event hosted by:
               {event.user.name}</p>
                <br></br>
                <div className="event-btn-container">
                    {show}
                    <br></br>
                    {edit}
                    <br></br>
                    {deleteEvent}
                </div>
            </Card.Body>
        </Card>
    );
}


function List({ events, session }) {
    let history = useHistory();

    let cards = events.map((event) => (
        <Event event={event} session={session} key={event.id} />
    ));

    function newEventRoute() {
        history.push("/event/new");
        history.go(0);
    }

    function CreateEvent({ session }) {
        if (session) {
            return (
                <Button className="create-event" variant="outline-primary" onClick={() => newEventRoute()}>New Event</Button>
            );
        } else {
            return null;
        }
    }

    function EventPermission({ session }) {
        if (session) {
            return (<Container><Row>{cards}</Row></Container>);
        } else {
            return (<h4>Howdy! Please login/signup to view events :)</h4>);
        }
    }

    return (
        <Container>
            <h1>Upcoming Events</h1>
            <EventPermission session={session} />
            <CreateEvent session={session} />
        </Container>
    );
}

export default connect(
    ({ events, session }) => ({ events, session }))(List);