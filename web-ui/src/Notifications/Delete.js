import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { delete_notification } from '../api'; 

function DeleteNotification({company, session}) {

	let history = useHistory();
	const location = useLocation();

	const [notification, setNotification] = useState({
        company_id: company.id, 
        user_id: session.user_id
	});

    function del(notif) {
        //alert(notif.id)
        if (notif.company_id === company.id && notif.user_id === session.user_id) {
            //alert(notif.id)
            delete_notification(notif.id);
        }
    }

	function submit(ev) {
		ev.preventDefault();

        company.notifications.map((notif) => (del(notif)));

        // for (let i = 0; i < company.notifications; i++) {
        //     alert("hii")
        //     //alert(company.notifications[i]);
        // }

		// delete_notification(notification).then(() => {
		// 	history.push(location.pathname);
		// 	history.go(0);
		// });
	}

	return (
		<Row>
			<Col>
				<Form onSubmit={submit}>
					<Button variant="success" type="submit">Stop notifications!</Button>
				</Form>
			</Col>
		</Row>
	);
}

export default DeleteNotification;