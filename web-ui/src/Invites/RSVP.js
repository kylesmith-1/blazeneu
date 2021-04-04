import { Row, Col, Form, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useState } from 'react';
import { edit_invite, fetch_events } from '../api';

function Response({ invite }) {
	const [response, setResponse] = useState(invite);
	const [radioValue, setRadioValue] = useState(null);


	function submit(ev) {
		ev.preventDefault();
		edit_invite(response.id, response).then(() => {
			fetch_events();
		});
	}

	function sendResponse(ev) {
		let response = Object.assign({}, invite);

		response["response"] = ev.target.value;
		setResponse(response);
	}

	return (
		<div>
			<Row>
				<Col>
					<Form onSubmit={submit}>
						<p>Can you make it?</p>
						<ButtonGroup toggle onChange={sendResponse}>
							<ToggleButton
								type="radio"
								variant="success"
								name="response"
								value="Going"
								checked={radioValue === "Going"}
								onChange={(e) => setRadioValue("Going")}>
								Yes!
            </ToggleButton>
							<ToggleButton
								type="radio"
								variant="danger"
								name="response"
								value="Not Going"
								checked={radioValue === "Not Going"}
								onChange={(e) => setRadioValue("Not Going")}>
								No :(
            </ToggleButton>
							<ToggleButton
								type="radio"
								variant="info"
								name="response"
								value="Interested"
								checked={radioValue === "Interested"}
								onChange={(e) => setRadioValue("Interested")}>
								Maybe so...
            </ToggleButton>

						</ButtonGroup>
						<br></br>
						<br></br>
						<Button className="submit-btn" variant="primary" type="submit">Submit</Button>
					</Form>
				</Col>
			</Row>
		</div>
	);
}

export default Response;
