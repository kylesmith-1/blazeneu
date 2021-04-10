import { Row, Container, Button, Card, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { ReactComponent as Working } from '../assets/working.svg';
import { ReactComponent as MagnifyingGlass } from '../assets/magnifyingglass.svg';
import { delete_company } from '../api';

import { ch_join } from '../socket';


const SearchBar = ({ searchQuery, setSearchQuery }) => (

    <div className="search-bar">
        <Form action="/" method="get">
            <div class="container d-flex justify-content-flex-start">
                <Form.Control
                    value={searchQuery}
                    onInput={e => setSearchQuery(e.target.value)}
                    type="text"
                    id="header-search"
                    placeholder="Search for a company"
                    name="s"
                />
                <div class="input-group-append">
                    <Button className="btn btn-dark" type="submit"><MagnifyingGlass /></Button>
                </div>
            </div>
    </Form>
    </div>
);

const filterCompanies = (companies, query) => {
    if (!query) {
        return companies;
    }

    return companies.filter((company) => {
        const companyName = company.name.toLowerCase();
        return companyName.includes(query.toLowerCase());
    });
};

function Company({ company, session }) {
    // let deleteCompany = null;
    let edit = null;
    let show = null;
    let deleteComp = null;
    let history = useHistory();


    // access levels for users
    // if (company.user.id === session.user_id) {
    edit = (
        <Button variant="primary-outline" onClick={edit_Company}>Edit Company Info</Button>
    );
    deleteComp = (
        <Button variant="primary-outline" onClick={() => delete_company(company)}>Delete Company</Button>
    );

    function showCompany() {
        history.push("/company/view/" + company.id);
    }

    function edit_Company() {
        history.push("/company/edit/" + company.id);
        history.go(0);
    }

    show = (
        <Button className="show-btn" variant="secondary" onClick={showCompany}> Show</Button>
    );


    return (
        <Card style={{ width: '16rem' }}>
            <Card.Body>
                <Card.Title>{company.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{company.location}</Card.Subtitle>
                <br></br>
                <div className="event-btn-container">
                    {show}
                    <br></br>
                    {edit}
                    <br></br>
                    {deleteComp}
                </div>
            </Card.Body>
        </Card>
    );
}


function List({ companies, session }) {
    let history = useHistory();
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredCompanies = filterCompanies(companies, searchQuery);

    const [state, setState] = useState({
        numEntries: 0,
    });

    useEffect(() => ch_join(setState));

    let cards = filteredCompanies.map((company) => (
        <Company company={company} session={session} key={company.id} />
    ));

    function newCompanyRoute() {
        history.push("/company/new");
        history.go(0);
    }

    function CreateCompany({ session }) {
        if (session) {
            return (
                <div className="create-company">
                    <div class="container d-flex justify-content-center">
                        <p className="create-company-text">Didn’t find what you’re looking for? Add a company!</p>
                    </div>
                    <div class="container d-flex justify-content-center">
                        <Button className="create-company" variant="info" onClick={() => newCompanyRoute()}>Add a new company</Button>
                    </div>
                </div>

            );
        } else {
            return null;
        }
    }

    function CompanyView() {
        return (<Container><Row>{cards}</Row></Container>);
    }

    return (
        <Container className="margin-bottom">
            <div className="splash">
                <div className="text-content">
                    <h2 className="splash-title">Success, <br></br> not drug tests</h2>
                    <p className="splash-text">We want you to be as prepared as possible. <br></br>
                Know what to expect, <em>before</em> you get to the interview.</p>
                <p className="splash-text"><br/> <span className="blazeNumber">{state.numEntries}</span> student contributions and counting.</p>
                </div>
                <Working />
            </div>
            <div >
                <SearchBar searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery} />
            </div>
            <CompanyView session={session} />
            <CreateCompany session={session} />

            <div className="splash">
                <div className="text-content">
                    <h2 className="splash-title">Disclaimer</h2>
                    <p className="splash-text">The <span className="blaze">BLAZE</span> <span className="neu">NEU</span> team does not encourage or condone the use of recreational drugs, which may violate aspects of the Northeastern University Code of Student Conduct.<br/><br/>
                    It is our belief that transpareny in employment screening is mutually beneficial for students and employers.<br/><br/>
                    This website exists to improve that transparency.</p>
                </div>
            </div>


        </Container>
    );
}

export default connect(
    ({ companies, session }) => ({ companies, session }))(List);