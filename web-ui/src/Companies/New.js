import { Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useState } from 'react';
import { create_company, fetch_companies } from '../api';
import { useHistory, BrowserRouter as Router, Route } from 'react-router-dom';

import React, { Component } from 'react';
import Home from '../Home.js';


function CompanyNew() {
	let history = useHistory();

	const [company, setCompany] = useState({
		name: "",
		location: ""
	});

	function submit(ev) {

		let address = document.getElementById("jrj").value.toString();
		console.log(address);
		console.log(company);

		// let company_made2 = Object.assign({}, company);
		// company_made2["location"] = address;
		// setCompany(company_made2);		
		setCompany({
		name: company.name,
		location: address
		});
		console.log(company);
		
		ev.preventDefault();
		create_company(company).then(() => {
			history.push("/");
			fetch_companies();
		});
	}

	function updateBody(field, ev) {
		let company_made = Object.assign({}, company);
		company_made[field] = ev.target.value;
		setCompany(company_made);
	}


	return (
		<Row>
			<Col>
				<h1>New Company</h1>
				<Form onSubmit={submit}>
					<Form.Group>
						<Form.Label>Company Title</Form.Label>
						<Form.Control type="text"
							onChange={(ev) => updateBody("name", ev)}
							value={company.name || ""} />
					</Form.Group>
					{/* <Form.Group>
						<Form.Label>Location</Form.Label>
						<Form.Control id="loc" onChange={(ev) => updateBody("location", ev)}
							value={company.location || ""} />
					</Form.Group> */}
					<Form.Group>
						<Home />
					</Form.Group>
					<br />
					<Button variant="success"
						type="submit">
						Create
						</Button>
				</Form>
			</Col>
		</Row>
	);
}

export default connect(({ session }) => ({ session }))(CompanyNew);