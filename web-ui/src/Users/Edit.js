import { Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { edit_user, fetch_users } from '../api';


function get_user(users, id) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return users[i];
        }
    }

    return null;
}

function EditUser({ users, session }) {
    let history = useHistory();
    let prevUser = get_user(users, session ? session.user_id : null);

    const [user, setUser] = useState({
        name: prevUser ? prevUser.name : "",
        email: prevUser ? prevUser.email : "",
        password: "",
        comparePass : "",
        password_hash: prevUser ? prevUser.password_hash : "",
    });


    function check_pass(p1, p2) {
        if (p1 !== p2) {
            return "Passwords don't match.";
        }

        if (p1.length < 8) {
            return "Password too short.";
        }

        return "";
    }

    function updateBody(field, ev) {
        let u1 = Object.assign({}, user);
        u1[field] = ev.target.value;
        u1.pass_msg = check_pass(u1.password, u1.comparePass);
        setUser(u1);
    }

    function submit(ev) {
        ev.preventDefault();

        edit_user(session.user_id, user).then(() => {
            fetch_users();
            history.push("/user/view");
        });
    }


    if (session) {

        return (
            <Row>
                <Col>
                    <h1>Edit User</h1>
                    <Form onSubmit={submit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                onChange={(ev) => updateBody("name", ev)}
                                value={user.name || ""} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"
                                onChange={(ev) => updateBody("email", ev)}
                                value={user.email || ""} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                onChange={(ev) => updateBody("password", ev)}
                                value={user.password || ""} />
                            <p>{user.pass_msg}</p>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password"
                                onChange={(ev) => updateBody("comparePass", ev)}
                                value={user.comparePass || ""} />
                        </Form.Group>
                        <br />
                        <Row>
                        <Button variant="primary"
                            type="submit">
                            Save
						</Button>
                        </Row>
                        <br></br>
                        <Row>
                        <Button className="home-btn" variant="secondary">
                    <Link to="/user/view">Back</Link>
                </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        );
    } else {
        return (
                <h4>Oops! You can't be here, a user that isn't signed in can't edit!</h4>
        );
    }
}

export default connect(({users, session}) => ({users, session}))(EditUser);