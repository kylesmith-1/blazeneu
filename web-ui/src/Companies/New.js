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

	const [manual, setManual] = useState({
		manual: false
	});

	function submit(ev) {

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

	function updateLocation() {

		if (!(manual.manual)) {
			let address = document.getElementById("jrj").value.toString();
			console.log(address);
			console.log(company);
			
			setCompany({
			name: company.name,
			location: address
			});
			console.log(company);
		}
	}

	function updateManual() {
		let manual_made = Object.assign({}, manual);
		manual_made["manual"] = !(manual.manual);
		setManual(manual_made);
	}

	function manualButton() {
		if (manual.manual) {
			return (
				<Button onClick={() => updateManual()}>
					Google Maps Location Entry
				</Button>);
		}
		else {
			return (
				<Button
					onClick={() => updateManual()}>
					Manual Location Entry
				</Button>);
		}
	}

	function returnLocationEntry() {
		if (manual.manual) {
			return (
				<Form.Group>
					<Form.Label>Manually Entered Address</Form.Label>
					<Form.Control type="text"
						onChange={(ev) => updateBody("location", ev)}
						value={company.location || ""} />
				</Form.Group>
			);
		}
		else {
			return (
			<Form.Group>
				<Home />
			</Form.Group>);	
		}
	}

	return (
		<Row>
			<Col>
				<h1>New Company</h1>
				<Form onSubmit={submit}>
					<Form.Group>
						<Form.Label>Company Name</Form.Label>
						<Form.Control type="text"
							onChange={(ev) => updateBody("name", ev)}
							value={company.name || ""} />
					</Form.Group>

					{returnLocationEntry()}
					<br />
					<br />
					{manualButton()}
					<br />
					<br />

					<Button variant="success"
						onClick={updateLocation} type="submit">
						Create
					</Button>
				</Form>
			</Col>
		</Row>
	);
}

export default connect(({ session }) => ({ session }))(CompanyNew);