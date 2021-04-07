import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import "./App.scss";
import Nav from './Nav';
import List from './Events/List';
import CompanyNew from './Events/New';
import EditCompany from './Events/Edit';
import SingleCompany from './Events/View';
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
      </Switch>
    </Container>
  );
}

export default App;