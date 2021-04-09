import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState } from 'react';

import { api_login } from './api';
import store from './store';

function LoginForm() {
    const location = useLocation();
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    function submit(ev) {
        ev.preventDefault();
        api_login(email, pass);
        // so user signup disappears after signing up for an account, and any time someone revisits signup screen on login
        if (location.pathname.includes("signup")) {
            history.push("/");
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={submit} inline>
                        Email:
			<Form.Control name="email"
                            type="text"
                            onChange={(ev) => setEmail(ev.target.value)}
                            value={email} />
			Password:
			<Form.Control name="password"
                            type="password"
                            onChange={(ev) => setPass(ev.target.value)}
                            value={pass} />
                        <Button variant="secondary" type="submit">Login</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

function SessionInfo({ session }) {

    function logout(ev) {
        ev.preventDefault();
        store.dispatch({ type: 'session/clear' });
    }

    return (
        <Container>
            <Row>
                <Col>
                    Username:
                    <Link to="/user/view">{session.name}</Link> |
                    Email:
                    {session.email} |
                    <Button onClick={logout}> Logout</Button>
                </Col>
            </Row>
        </Container>
    );
}

function LOI({ session }) {
    if (session) {
        return <SessionInfo session={session} />;
    } else {
        return <LoginForm />;
    }
}

const LoginOrInfo = connect(
    ({ session }) => ({ session }))(LOI);

function CheckForSignUp({ session }) {
    if (!session) {
        return (
            <Button variant="success">
                <Link to="/signup">Sign Up</Link>
            </Button>
        );
    } else {
        return (null);
    }
}

const Signup = connect(({ session }) => ({ session }))(CheckForSignUp);

function AppNav({ error }) {
    let error_msg = null;

    if (error) {
        error_msg = (
            <Row>
                <Col>
                    <Alert variant="danger">{error}</Alert>
                </Col>
            </Row>
        );
    }

    return (
        <Container className="nav-bar">
            <Row>
                <Button className="home-btn" variant="primary">
                    <Link to="/">All Companies</Link>
                </Button>
                <Col>
                    <LoginOrInfo />
                </Col>
                <Signup />
            </Row>
            {error_msg}
        </Container>
    );
}

export default connect(({ error }) => ({ error }))(AppNav);