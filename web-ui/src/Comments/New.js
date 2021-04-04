import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { create_comment } from '../api';

function CreateComment() {
	let history = useHistory();
	const location = useLocation();

	const [comment, setComment] = useState({
		body: "",
		event_id: location.pathname.slice(-1)
	});

	function submit(ev) {
		ev.preventDefault();

		create_comment(comment).then(() => {
			history.push(location.pathname);
			history.go(0);
		});
	}

	function updateBody(ev) {
		let newComment = Object.assign({}, comment);
		newComment["body"] = ev.target.value;
		setComment(newComment);
	}

	return (
		<Row>
			<Col>
				<Form onSubmit={submit}>
					<Form.Group>
						<Form.Label>Add comments here about the event</Form.Label>
						<Form.Control onChange={updateBody} value={comment.body || ""} />
					</Form.Group>
					<Button variant="success" type="submit">Post Comment</Button>
				</Form>
			</Col>
		</Row>
	);
}

export default CreateComment;