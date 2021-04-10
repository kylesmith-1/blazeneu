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
						
							<strong>Name:</strong> {session.name}
							<br></br>
							<strong>Email:</strong> {session.email}
						
					</Col>
				</Row>
				<Row>
						<Link className="edit-user" to="/user/edit">Edit User Information</Link>
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