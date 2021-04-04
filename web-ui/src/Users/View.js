import { Row, Col, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function SingleUser({session}) {
	if (session) {

		return(
			<Container>
				<Row>
					<Col>
						<h2>Show User</h2>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="event-details">
							<strong>Name:</strong> {session.name}
							<br></br>
							<strong>Email:</strong> {session.email}
						</div>
					</Col>
				</Row>
				<Row>
				<Button>
						<Link to="/user/edit">Edit</Link>
					</Button>
				</Row>
			</Container>
		);
	} else {
		return(
				<h4>Oops! You can't be here, a user that isn't signed in can't edit!</h4>
		);
	} 
}

export default connect(({users, session}) => ({users, session}))(SingleUser);