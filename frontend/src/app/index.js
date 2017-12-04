import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory, Link, Switch} from 'react-router-dom'

import Dashboard from './components/dashboard';
import Hosts from './components/hosts';
import Host from './components/subcomponents/host';
import Properties from './components/properties';
import PropertiesForm from './components/subcomponents/propertyForm';
import Versions from './components/versions';

class App extends Component {
  render(){
    return (
      <Router history={browserHistory}>
        <div>
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/hosts/add" component={Host}/>
            <Route path="/hosts/:id/edit" component={Host}/>
            <Route path="/hosts/:id/properties/:pid/versions" component={Versions}/>
            <Route path="/hosts/:id/properties/add" component={PropertiesForm}/>
            <Route path="/hosts/:id/properties/:pid/edit" component={PropertiesForm}/>
            <Route path="/hosts/:id/properties/:pid" component={Properties}/>
            <Route path="/hosts/:id" component={Hosts}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
