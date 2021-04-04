import { Row, Col, Container } from 'react-bootstrap';

function Invite({invite}) {
	return(
		<Row>
			<Col>
				<em> {invite.email} </em>
			</Col>
			<Col>
				{invite.response}
			</Col>
		</Row>
	);
}

function ViewInvites({event}) {

	let invites = event.invites;
	let LOI = invites.map((invite) => (
		<Invite invite={invite} key={invite.id} />
	));

	return(
		<div>
			<h2>Invite List</h2>
			{ LOI }
		</div>
	);
}

export default ViewInvites;