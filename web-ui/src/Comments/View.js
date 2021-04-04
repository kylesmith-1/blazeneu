import { Row, Col, Container, Button } from 'react-bootstrap';
import { delete_comment } from '../api';


/*a single comment component constructed*/
function Comment({comment, event, session}) {

	let delete_btn = null;
	if (event.user.id === session.user_id || comment.user.id === session.user_id) {
		delete_btn = (<Button variant="outline-danger" onClick={() => delete_comment(comment.id)}>Delete</Button>);
	} 
	
	return(
		<Container className="event-details">
				<Row>
					<Col>
						<h5>{comment.user.name}</h5>
						<br />
						{comment.body}
					</Col>
					{delete_btn}
				</Row>
				</Container>
	);
}

function ViewComments({event, session}) {
	let comments = event.comments.map((comment) => (
		<Comment comment={comment} event={event} session={session}
						key={comment.id} />
	));

	return(
		<Row>
			<Col>
				<h4>Comments</h4>
				{comments}
			</Col>
		</Row>
	);
}


export default ViewComments;