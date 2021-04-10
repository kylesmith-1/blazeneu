import { Row, Col, Button, Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { useLocation, useHistory } from "react-router-dom";
//import CreateComment from '../Comments/New';
import ViewEntries from '../Entries/View';
import { get_company } from '../api';
import EntryNew from '../Entries/New';
import NotificationNew from '../Notifications/New';
import DeleteNotification from '../Notifications/Delete';
import NotificationButton from '../Notifications/Button';
import SuccessGif from './SuccessGif';


function SingleCompany({ companies, session }) {

	const location = useLocation();
	let history = useHistory();
	let id = parseInt(location.pathname.slice(-1));
	let company = get_company(companies, id);
	// alert(company.entries);


	// if (session) { --> can add back to control whether they can add entries later

	let editbtn = null;
	let comments = null;
	// if (company.user.id === session.user_id) {
	editbtn = (<Button variant="primary-outline" onClick={editCompanyRoute}>Edit Company</Button>)
	//comments = (<CreateComment company_id={company.id}></CreateComment>)
	// } 
	// 	else {
	// 		typeOfInvite = <h3><b>You were not invited to this event :(</b></h3>
	// 	}
	// }


	function editCompanyRoute() {
		history.push("/company/edit/" + company.id);
		history.go(0);
	}

	//This is for creating entries, name should probably change
	function loginNotice() {
		if (session === null || session === "null") {
			return (
				<Row>
					<Col>
						<h3>Please register or login to create entries and sign up for notifications.</h3>
					</Col>
				</Row>
			);
		}
		else {
			return (
			<div><EntryNew company={company} session={session} />
			<br></br>
				<NotificationButton company={company} session={session} /> </div> );
		}
	}

	function notify() {
		if (session === null || session === "null") {
			return (
				<Row>
					<Col>
						<h3>Please register or login to sign up for notifications.</h3>
					</Col>
				</Row>
			);
		}
		else {
			return (<NotificationButton company={company} session={session} />);
		}
	}

	return (
		<Container>
			<br></br>
			<br></br>
			<Row>
				<Col>
					<h2>Drug Testing Information for <b>{company.name}</b></h2>
				</Col>
			</Row>
			<Row>
				<Col>
					<div className="company-details">
						<h6> <em>About this company: </em></h6>
						<div className="company-info-wrapper">
						<p className="company-info"><b>Company Name:</b> {company.name} </p>
						<p className="company-info"><b>Company Location:</b> {company.location} </p>
						</div>
						{/* <Row>
							<Col>
								{editbtn}
							</Col>
						</Row> */}
					</div>
				</Col>
			</Row>
			<br />
			{loginNotice()}
			{/* <br />
			{notify()} */}
			<ViewEntries company={company} session={session} />

			<SuccessGif company={company} />

			{/* <ViewComments company={company} session={session} /> */}
			{/* {comments} */}
		</Container>
	);
}


export default connect(({ companies, session }) => ({ companies, session }))(SingleCompany);