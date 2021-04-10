import { Container, Nav, Row, Col, Form, Button, Alert, Modal } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState } from 'react';

import { api_login } from './api';
import store from './store';

import { ReactComponent as Hands } from './assets/shakinghands.svg';

function LoginForm() {
    const location = useLocation();
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function submit(ev) {
        ev.preventDefault();
        api_login(email, pass);
        if (location.pathname.includes("signup")) {
            history.push("/");
        }
    }

    return (
        <Container>
                    <Link onClick={handleShow}>
                        LOGIN
                    </Link>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Welcome Back!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={submit} inline>
                                <Form.Group>
                                    <Form.Label> Email:
                                </Form.Label>
                                    <Form.Control name="email"
                                        type="text"
                                        onChange={(ev) => setEmail(ev.target.value)}
                                        value={email} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Pswd:
                                    </Form.Label>
                                    <Form.Control name="password"
                                        type="password"
                                        onChange={(ev) => setPass(ev.target.value)}
                                        value={pass} />
                                </Form.Group>
                                <div className="modal-btns">
                                <Button variant="primary" onClick={handleClose} type="submit">Login</Button>
                                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal>
        </Container>
    );
}

function SessionInfo({ session }) {

    function logout(ev) {
        ev.preventDefault();
        store.dispatch({ type: 'session/clear' });
    }

    function admin() {
        if (session.admin === "true" || session.admin === true) {
            return(<p className="admin-txt">(Admin)</p>);
        }
    }

    return (
        <div className="logged-in">
                   <p className="welcome-txt"> Welcome back,</p>
                    <Link to="/user/view">{session.name}</Link> 
                    {/* Email:
                    {session.email} | */}
                    {admin()}
                    <Button className="logout-btn" variant="link" onClick={logout}> LOGOUT</Button>
        </div>
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
                <Link to="/signup">SIGN UP</Link>
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
        <Container>
            <Nav>
            <Nav.Item>
                <Button className="home-logo" variant="link" href="/">
                    <span className="blaze">BLAZE</span> <span className="neu">NEU</span>
                    <span className="hands"><Hands /></span>
                </Button>
                </Nav.Item>
                <Nav.Item className="log-in">
                <LoginOrInfo /> 
                </Nav.Item>
                <Nav.Item className="sign-up">
               <Signup />
               </Nav.Item>
        </Nav>
            {error_msg}
        </Container>
    );
}

export default connect(({ error }) => ({ error }))(AppNav);