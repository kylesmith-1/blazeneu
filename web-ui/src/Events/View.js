import { Row, Col, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useLocation, useHistory } from "react-router-dom";
import CreateComment from '../Comments/New';
// import ViewComments from '../Comments/View';
import { get_company } from '../api';


function SingleCompany({ companies, session }) {

	const location = useLocation();
	let history = useHistory();
	let id = parseInt(location.pathname.slice(-1));
	let company = get_company(companies, id);


	// if (session) { --> can add back to control whether they can add entries later

	let editbtn = null;
	let comments = null;
	// if (company.user.id === session.user_id) {
	editbtn = (<Button variant="success" onClick={editCompanyRoute}>Edit Company</Button>)
	comments = (<CreateComment company_id={company.id}></CreateComment>)
	// } 
	// 	else {
	// 		typeOfInvite = <h3><b>You were not invited to this event :(</b></h3>
	// 	}
	// }


	function editCompanyRoute() {
		history.push("/company/edit/" + company.id);
		history.go(0);
	}

	return (
		<Container>
			<br></br>
			<br></br>
			<Row>
				<Col>
					<h2>Company Details</h2>
				</Col>
				<Col>
					{editbtn}
				</Col>
			</Row>
			<Row>
				<Col>
					<div className="event-details">
						<em>Company Name:</em> {company.name}
						<br></br>
						<em>Company Location:</em> {company.location}
					</div>
				</Col>
			</Row>
			<br />
			{/* <ViewComments company={company} session={session} /> */}
			{/* {comments} */}
		</Container>
	);
}


export default connect(({ companies, session }) => ({ companies, session }))(SingleCompany);