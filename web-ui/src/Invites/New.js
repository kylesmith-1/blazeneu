import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { create_invite } from '../api';

function CreateInvite({ }) {
	const location = useLocation();
	let history = useHistory();

	const [invite, sendInvite] = useState({
		email: "",
		event_id: parseInt(location.pathname.slice(-1))
	});

	function submit(ev) {
		ev.preventDefault();
		create_invite(invite).then(() => {
			history.push(location.pathname);
			// attribution https://www.w3schools.com/jsref/met_his_go.asp
			history.go(0);
		});
	}

	function inviteEmail(ev) {
		let newInvite = Object.assign({}, invite);
		newInvite["email"] = ev.target.value;
		sendInvite(newInvite);
	}

	return (
		<Container>
			<Row>
				<Col>
					<p> Enter the email of the person you want to invite. It's ok if they don't have an account yet! Provide them this link and they can sign up from there.</p>
					<p className="email-link">
					Link to RSVP:
						{"https://events-spa.rebekah-johnson.dev" + location.pathname}
				</p>
					<Form onSubmit={submit}>
						<Form.Group>
							<input type="text"
								className="form-control"
								onChange={inviteEmail}
								value={invite.email || ""}
								placeholder="Email" />
						</Form.Group>
						<Button variant="primary" type="submit">Invite</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export default connect(({ session }) => ({ session }))(CreateInvite);