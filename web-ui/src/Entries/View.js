import { Row, Col, Container, Button } from 'react-bootstrap';
import { delete_entry } from '../api';

import React from 'react';

/*attribution for emojis: https://medium.com/@seanmcp/%EF%B8%8F-how-to-use-emojis-in-react-d23bbf608bf7*/

const Emoji = props => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
);

function Entry({ entry, company, session }) {
	function coop_cycle() {
		if (entry.coop_cycle != null && entry.coop_cycle != "null" && !(entry.coop_cycle.includes("Null"))) {
			return (<h6>Co-op Cycle: {entry.coop_cycle}</h6>);
		}
	}

	function additional_notes() {
		if (entry.additional_notes != null && entry.additional_notes != "null" && entry.additional_notes != "") {
			return (<h6>Additional Notes: {entry.additional_notes}</h6>);
		}
	}

	function renderDrugTest() {
		let yes = 0;
		let no = 0;
		if (entry.drug_test.toString() == "false") {
			return (<p className="booleanFalse"> <span className="black-txt">Drug test?</span> This company does <b>not</b> drug test.<Emoji symbol="🤩" label="starstruck"/></p> );
		}
		else {
			return (<p className="booleanTrue"><span className="black-txt">Drug test? </span>This company drug tests. <Emoji symbol="😬" label="grimace"/></p>);
		}
}

function renderContinuous() {
	if (entry.continuous_drug_testing.toString() == "false") {
		return (<p> Continuous testing? This company does <b>not</b> drug test continuously. <Emoji symbol="🤩" label="starstruck"/></p>);
	}
	else {
		return (<p> Continuous testing? This company does drug test continuously. <Emoji symbol="😬" label="grimace"/></p>);
	}
}

return (
	<Container className="company-details">
		<Row>
			<Col>
				{/* <h5> Entry {entry.id} </h5> */}
				{coop_cycle()}
				{renderDrugTest()}
				{renderContinuous()}
				<br></br>
				{additional_notes()}
				<br />
			</Col>
			<Col>
				<Button variant="primary-outline" onClick={() => delete_entry(entry.id)}>Delete Entry</Button>
			</Col>
		</Row>
	</Container>
);
}

function ViewEntries({ company, session }) {
	let entries = company.entries.map((entry) => (
		<Entry entry={entry} company={company} session={session}
			key={entry.id} />
	));

	return (
		<Row>
			<Col>
			<br>
			</br>
				<h2> User Entries</h2>
				{entries}
			</Col>
		</Row>
	);
}


export default ViewEntries;
