import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

import Property from './subcomponents/property';
import Address from './subcomponents/address';

const { API } = require('./../config');
const url = '_id_/properties/_pid_';

export default class Properties extends Component {

  constructor(props){
    super(props);
    let id = props.match.params.id || null;
    let pid = props.match.params.pid || null;
    this.state = {
      'properties': [],
      'property': '',
      'address': '',
      'versions_url': `/hosts/${id}/properties/${pid}/versions`,
      'back_url': `/hosts/${id}`
    }
  }

  componentDidMount(){
    this.getProperties(this.state.id);
  }

  onChange(){
    return false;
  }

  getProperties(id = null) {
    let property = [];
    let ids = {
        '_id_': this.props.match.params.id,
        '_pid_': this.props.match.params.pid,
    }
    let property_url = url.replace(/_id_|_pid_/gi, matched => {
        return ids[matched];
    });
    this.setState({
        'url': property_url
    });
    fetch(API + property_url, {method: 'GET', mode: 'cors'}).then( response => {
      return response.json();
    }).then(json => {
        let property = <Property {...json.property} update={this.onChange}/>;
        let address = <Address {...json.address} update={this.onChange}/>;
        this.setState({property, address});
    }).catch(function(err) {
      console.log(err.message);
    });
  }

  render() {
    return (
      <div>
          <div className="col-xs-12">
            <Link to={this.state.back_url}>
                <button type="button" className="btn btn-default pull-left">Properties</button>
            </Link>
            <Link to={this.state.versions_url}>
                <button type="button" className="btn btn-primary pull-right">Versions</button>
            </Link>
          </div> 
        <form>
            <div className="col-md-6">
            <h2>Property</h2>
                {this.state.property}
            </div>
            <div className="col-md-6">
            <h2>Address</h2>
                {this.state.address}
            </div>
        </form>
      </div>
    );
  }
}
