import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { create_entry } from '../api'; //todo, does not exist yet

function CreateEntry() {
	let history = useHistory();
	const location = useLocation();

	const [entry, setEntry] = useState({
		drug_test: false,
        continuous_drug_testing: false,
        verified: false,
        additional_notes: "",
        company_id: 1, //where to get this fom? they will need to be passed
        user_id: 1 //where to get this from? they will need to be passed
        //need more here
		//company_id: location.pathname.slice(-1)
	});

	function submit(ev) {
		ev.preventDefault();

		create_entry(entry).then(() => {
			history.push(location.pathname);
			history.go(0);
		});
	}

	function updateAdditionalNotes(ev) {
		let newEntry = Object.assign({}, entry);
		newEntry["additional_notes"] = ev.target.value;
		setEntry(newEntry);
	}

    //needs to change
    function updateDrugTested(ev) {
		let newEntry = Object.assign({}, entry);
		newEntry["drug_tested"] = true;
		setEntry(newEntry);
	}

    //TO ADD: literally all the other fields
	return (
		<Row>
			<Col>
				<Form onSubmit={submit}>
					<Form.Group>
						<Form.Label>Add additional notes here about the entry</Form.Label>
						<Form.Control onChange={updateAdditionalNotes} value={entry.additional_notes || ""} />
					</Form.Group>
                    <Form.Group>
						<Form.Label>Were you drug tested?</Form.Label>
						<Form.Control onChange={updateDrugTested} value={entry.dug_tested || false} />
					</Form.Group>
					<Button variant="success" type="submit">Post Entry</Button>
				</Form>
			</Col>
		</Row>
	);
}

export default CreateEntry;