import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import "./App.scss";
import Nav from './Nav';
import List from './Events/List';
import CompanyNew from './Events/New';
import EntryNew from './Entries/New';
import Demo2 from './Entries/Button';
import EditCompany from './Events/Edit';
import SingleCompany from './Events/View';
import ViewEntry from './Entries/View';
import UsersNew from './Users/New';
import EditUser from './Users/Edit';
import SingleUser from './Users/View';


function App() {

  return (
    <Container>
      <Nav />
      <Switch>
        <Route path="/" exact>
          <List />
        </Route>
        <Route path="/signup" exact>
          <UsersNew />
        </Route>
        <Route path="/company/new" exact>
          <CompanyNew />
        </Route>
        <Route path="/company/view/">
          <SingleCompany />
        </Route>
        <Route path="/company/edit/">
          <EditCompany />
        </Route>
        <Route path="/user/view" exact>
          <SingleUser />
        </Route>
        <Route path="/user/edit" exact>
          <EditUser />
        </Route>
        <Route path="/entry/new" exact>
          <EntryNew company={1} user={1}/>
        </Route>
        <Route path="/entry/button" exact>
          <Demo2 />
        </Route>
        <Route path="/entry/view/">
          <ViewEntry />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;