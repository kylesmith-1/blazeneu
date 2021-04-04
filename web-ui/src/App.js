import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import "./App.scss";
import Nav from './Nav';
import List from './Events/List';
import EventsNew from './Events/New';
import EditEvent from './Events/Edit';
import SingleEvent from './Events/View';
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
        <Route path="/event/new" exact>
          <EventsNew />
        </Route>
        <Route path="/event/view/">
          <SingleEvent />
        </Route>
        <Route path="/event/edit/">
          <EditEvent />
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