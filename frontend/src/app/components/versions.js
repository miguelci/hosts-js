import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

import AddressRow from './subcomponents/addressRow';

const { API } = require('./../config');

export default class Hosts extends Component {

  constructor(props){
    super(props);
    let id = props.match.params.id || null;
    let pid = props.match.params.pid || null;
    this.state = {
      'versions': [],
      path: `${id}/properties/${pid}/versions`,
      back_url: `${id}/properties/${pid}`,
    }
  }

  componentDidMount(){
    this.getVersions();
  }

  getVersions() {
    let versions = [];
    let versions_url = this.state.path;

    fetch(API + versions_url, {method: 'GET', mode: 'cors'}).then( response => {
      return response.json();
    }).then(json => {
        versions = json.versions.map( (v, idx) => {
            return <tr key={idx}>
                <td>{v.data.name}</td>
                <td><AddressRow {...v.data.address} /></td>
                <td>{v.data.income}</td>
                <td>{v.data.airbnb_id}</td>
                <td>{v.data.numberOfBathrooms}</td>
                <td>{v.data.numberOfBedrooms}</td>
            </tr>
        })
        this.setState({versions});
    }).catch(function(err) {
      console.log(err.message);
    });
  }

  render() {
    return (
      <div>
        <h2>Versions</h2>
        <Link to={this.state.back_url}><button style={{marginBottom:'10px'}}className="btn btn-default pull-left">Property</button></Link>
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Income</th>
                <th>Airbnb Id</th>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
            </tr>
            </thead>
            <tbody>
            {this.state.versions}
            </tbody>
        </table>
        
      </div>
    );
  }
}
