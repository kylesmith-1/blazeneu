/*import { Row, Col, Container, Button } from 'react-bootstrap';

function ViewEntry({company, session}) {
	return(
		<Row>
			<Col>
				<h4>There would be an entry here :p</h4>
			</Col>
		</Row>
	);
}


export default ViewEntry;*/

import { Row, Col, Container, Button } from 'react-bootstrap';


function Entry({entry, company, session}) {
	return(
		<Container className="company-details">
				<Row>
					<Col>
						{/* <h5>{entry.user.email}</h5> */}
						<h5>This is an entry {entry.id} </h5>
						<h6>Co-op Cycle? {entry.coop_cycle}</h6>
						<h6>Drug testing? {entry.drug_test.toString()}</h6>
						<h6>Continious Drug testing? {entry.continuous_drug_testing.toString()}</h6>
						<h6>Additional Notes? {entry.additional_notes}</h6>
						<br />
					</Col>
				</Row>
				</Container>
	);
}

function ViewEntries({company, session}) {
	let entries = company.entries.map((entry) => (
		<Entry entry={entry} company={company} session={session}
						key={entry.id} />
	));

	return(
		<Row>
			<Col>
				<h4>Entries</h4>
				{entries}
			</Col>
		</Row>
	);
}


export default ViewEntries;