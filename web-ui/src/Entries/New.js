import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { create_entry } from '../api'; //todo, does not exist yet

function CreateEntry() {
	let history = useHistory();
	const location = useLocation();

	const [entry, setEntry] = useState({
		drug_test: null,
        continuous_drug_testing: null,
		coop_cycle: "Null Null",
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

    function updateDrugTested(ev) {
		let newEntry = Object.assign({}, entry);
		newEntry["drug_test"] = ev.target.value;
		if (ev.target.value === false || ev.target.value === "false") {
			newEntry["continuous_drug_testing"] = false;
		}
		setEntry(newEntry);
	}

	function updateContDrugTested(ev) {
		if (entry.drug_test != false && entry.drug_test != "false") {
			let newEntry = Object.assign({}, entry);
			newEntry["continuous_drug_testing"] = ev.target.value;
			setEntry(newEntry);
		}
	}

	function updateCoopSeason(ev) {
		let newEntry = Object.assign({}, entry);
		let arr = entry.coop_cycle.split(" ");
		newEntry["coop_cycle"] = ev.target.value + " " + arr[1];
		setEntry(newEntry);
	}

	function updateCoopYear(ev) {
		let newEntry = Object.assign({}, entry);
		let arr = entry.coop_cycle.split(" ");
		newEntry["coop_cycle"] = arr[0] + " " + ev.target.value;
		setEntry(newEntry);
	}

	function coop_cycle() {
		return (
		<Form.Group>
			<Form.Label>What co-op cycle was this?</Form.Label>
			<br/>
			<label>
            <input
              type="radio"
              value="Spring"
              checked={entry.coop_cycle.includes("Spring")}
			  onChange={updateCoopSeason}
            />
            Spring
			</label>
			<label>
            <input
              type="radio"
              value="Fall"
              checked={entry.coop_cycle.includes("Fall")}
			  onChange={updateCoopSeason}
            />
			Fall
			</label>
			<select class="form-control" id="exampleFormControlSelect1" onChange={updateCoopYear}>
				<option>2021</option>
				<option>2020</option>
				<option>2019</option>
				<option>2018</option>
				<option>2017</option>
				<option>2016</option>
				<option>2015</option>
				<option>Pre-2015 (The ancient times)</option>
    		</select>
		</Form.Group>
		);
	}

	function drug_tested_radio() {
		return(
	     <Form.Group>
		  <Form.Label>Did you receive a drug test for this co-op? *</Form.Label>
		  <br/>
          <label>
            <input
              type="radio"
              value={true}
              checked={entry.drug_test === true || entry.drug_test === "true"}
			  onChange={updateDrugTested}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value={false}
              checked={entry.drug_test === false || entry.drug_test === "false"}
			  onChange={updateDrugTested}
            />
            No
          </label>
		  </Form.Group>
		);
	}

	function cont_drug_tested_radio() {
		return(
	     <Form.Group>
		  <Form.Label>If so, were you continuously drug tested during this co-op? *</Form.Label>
		  <br/>
          <label>
            <input
              type="radio"
              value={true}
              checked={(entry.continuous_drug_testing === true || entry.continuous_drug_testing === "true") && (entry.drugtest != false && entry.drugtest != "false")}
			  onChange={updateContDrugTested}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value={false}
              checked={entry.continuous_drug_testing === false || entry.continuous_drug_testing === "false" || entry.drug_test == "false" || entry.drug_test == false}
			  onChange={updateContDrugTested}
            />
            No
          </label>
		  </Form.Group>
		);
	}

	// return (
	// 	<Demo2 />
	// )
    //TO ADD: literally all the other fields
	return (
		<Row>
			<Col>
				<h2>Company Name Here</h2>
				<Form onSubmit={submit}>
					{coop_cycle()}
					{drug_tested_radio()}
					{cont_drug_tested_radio()}
					<Form.Group>
						<Form.Label>Any additional notes on drug testing at this company?</Form.Label>
						<Form.Control onChange={updateAdditionalNotes} value={entry.additional_notes || ""} />
					</Form.Group>
					<Button variant="success" type="submit">Post Entry</Button>
				</Form>
			</Col>
		</Row>
	);
}

export default CreateEntry;