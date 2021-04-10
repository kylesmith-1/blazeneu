import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { create_notification } from '../api'; 

function CreateNotification({company, session}) {

	let history = useHistory();
	const location = useLocation();

	const [notification, setNotification] = useState({
        company_id: company.id, 
        user_id: session.user_id
	});

	function submit(ev) {
		ev.preventDefault();

		create_notification(notification).then(() => {
			history.push(location.pathname);
			history.go(0);
		});
	}


	return (
		<Row>
			<Col>
				<Form onSubmit={submit}>
					<Button variant="primary" type="submit">Sign me up for notifications!</Button>
				</Form>
			</Col>
		</Row>
	);
}

export default CreateNotification;