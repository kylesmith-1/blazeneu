import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import pick from 'lodash/pick';
import store from '../store';

import { create_user, fetch_users, api_login } from '../api';

function UsersNew() {
	let history = useHistory();
	const [user, setUser] = useState({
		name: "", email: "", password: "", comparePass: "",
	});

	function submit(ev) {
		ev.preventDefault();

		let data = pick(user, ['name', 'email', 'password']);
		create_user(data).then((data) => {
			if (data.error) {
				let action = {
					type: 'error/set',
					data: data.error
				}
				store.dispatch(action);
			} else {
				fetch_users();
				api_login(user['email'], user['password']);
				history.push("/");
			}
		});
	}

	function check_pass(p1, p2) {
		if (p1 !== p2) {
			return "Passwords don't match.";
		}

		if (p1.length < 8) {
			return "Password too short.";
		}

		return "";
	}

	function update(field, ev) {
		let u1 = Object.assign({}, user);
		u1[field] = ev.target.value;
		u1.pass_msg = check_pass(u1.password, u1.comparePass);
		setUser(u1);
	}

	return (
		<Container>
			<Row>
				<Col>
					<h1>New User</h1>
					<div class="container d-flex justify-content-center">
					<Form onSubmit={submit}>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control type="text"
								onChange={
									(ev) => update("name", ev)}
								value={user.name || ""} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Email</Form.Label>
							<Form.Control type="email"
								onChange={(ev) => update("email", ev)}
								value={user.email || ""} />
						</Form.Group>
						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control type="password"
								onChange={(ev) => update("password", ev)}
								value={user.password || ""} />
							<p>{user.pass_msg}</p>
						</Form.Group>
						<Form.Group>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type="password"
								onChange={(ev) => update("comparePass", ev)}
								value={user.comparePass || ""} />
						</Form.Group>
						<br />
						<Button variant="primary" type="submit"
							disabled={user.pass_msg !== ""}>
							Save
					</Button>
					</Form>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

function state2props() {
	return {};
}

export default connect(state2props)(UsersNew);