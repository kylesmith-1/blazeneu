import { Form, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { edit_company, fetch_companies, get_company } from '../api';


function EditCompany({companies, session }) {
	const location = useLocation();
	let history = useHistory();
	let id = parseInt(location.pathname.slice(-1));
	let prevCompany = get_company(companies, id);

	const [company, setCompany] = useState(prevCompany);


	function submit(ev) {
		ev.preventDefault();

		edit_company(company.id, company).then(() => {
			history.push("/company/view/" + company.id);
			fetch_companies();
		});
	}
	
	function updateBody(field, ev) {
		let company_edited = Object.assign({}, company);
		company_edited[field] = ev.target.value;
		setCompany(company_edited);
	}

		return (
			<Row>
				<Col>	
					<h1>Edit Company</h1>
					<Form onSubmit={submit}>
						<Form.Group>
							<Form.Label>Company Title</Form.Label>
							<Form.Control type="text"
								onChange={(ev) => updateBody("name", ev)}
								value={company.name || ""} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Company Location</Form.Label>
							<Form.Control type="text" onChange={(ev) => updateBody("location", ev)}
								value={company.location || ""} />
						</Form.Group>
						<Button variant="success"
							type="submit">
							Save Company
						</Button>
					</Form>
				</Col>
			</Row>
		);
}

export default connect(({ companies, session }) => ({ companies, session }))(EditCompany);
