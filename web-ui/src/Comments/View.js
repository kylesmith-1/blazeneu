// import { Row, Col, Container, Button } from 'react-bootstrap';
// import { delete_comment } from '../api';


// /*a single comment component constructed*/
// function Comment({ comment, company, session }) {

// 	// let delete_btn = null;
// 	// if (company.user.id === session.user_id || comment.user.id === session.user_id) {
// 	let delete_btn = (<Button variant="outline-danger" onClick={() => delete_comment(comment.id)}>Delete</Button>);
// 	// } 

// 	return (
// 		<Container className="event-details">
// 			<Row>
// 				<Col>
// 					<h5>{comment.user.name}</h5>
// 					<br />
// 					{comment.body}
// 				</Col>
// 				{delete_btn}
// 			</Row>
// 		</Container>
// 	);
// }

// // function ViewComments({ company, session }) {
// // 	let comments = company.comments.map((comment) => (
// // 		<Comment comment={comment} company={company} session={session}
// // 			key={comment.id} />
// // 	));

// // 	return (
// // 		<Row>
// // 			<Col>
// // 				<h4>Comments</h4>
// // 				{comments}
// // 			</Col>
// // 		</Row>
// // 	);
// // }


//  export default ViewComments;