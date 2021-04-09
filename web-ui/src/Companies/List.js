import { Row, Container, Button, Card, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { useState } from 'react';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <Form action="/" method="get">
        <Form.Label htmlFor="header-search">
            <span className="visually-hidden">Search companies</span>
        </Form.Label>
        <Form.Control
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search for a company"
            name="s"
        />
        <Button type="submit">Search</Button>
    </Form>
);

const filterCompanies = (companies, query) => {
    if (!query) {
        return companies;
    }

    return companies.filter((company) => {
        const companyName = company.name.toLowerCase();
        return companyName.includes(query);
    });
};

function Company({ company, session }) {
    // let deleteCompany = null;
    let edit = null;
    let show = null;
    let history = useHistory();


    // access levels for users 
    // if (company.user.id === session.user_id) {
    edit = (
        <Button variant="info" onClick={edit_Company}>Edit Company Info</Button>
    );
    // deleteCompany = (
    //     <Button variant="danger" onClick={() => delete_Company(company.id)}>Delete Company</Button>
    // );
    // }

    function showCompany() {
        history.push("/company/view/" + company.id);
    }

    function edit_Company() {
        history.push("/company/edit/" + company.id);
        history.go(0);
    }

    show = (
        <Button className="show-btn" variant="primary" onClick={showCompany}> Show</Button>
    );


    return (
        <Card style={{ width: '16rem' }}>
            <Card.Body>
                <Card.Title>{company.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{company.location}</Card.Subtitle>
                {/* <Card.Text>
     <p> bleeeeeep bloop blop</p>
                </Card.Text> */}
                <br></br>
                <div className="event-btn-container">
                    {show}
                    <br></br>
                    {edit}
                    <br></br>
                    {/* {deleteCompany} */}
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
                <Button className="create-event" variant="outline-primary" onClick={() => newCompanyRoute()}>New Company</Button>
            );
        } else {
            return null;
        }
    }

    function CompanyView() {
        return (<Container><Row>{cards}</Row></Container>);
    }

    return (
        <Container>
            <div >
                <SearchBar searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery} />
            </div>
            <h1>Companies</h1>
            <CompanyView session={session} />
            <CreateCompany session={session} />
        </Container>
    );
}

export default connect(
    ({ companies, session }) => ({ companies, session }))(List);