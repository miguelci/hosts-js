import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

const { API } = require('./../config');
const url = API + '_id_/properties/';

export default class Hosts extends Component {

  constructor(props){
    super(props);
    let id = props.match.params.id || null;
    this.state = {
      'properties': [],
      id,
      path: `/hosts/${id}/properties/`
    }
  }

  componentDidMount(){
    this.getHosts(this.state.id);
  }

  getHosts(id = null) {
    let properties = [];
    let properties_url = url.replace('_id_', id);
    let property_url = this.state.path;

    fetch(properties_url, {method: 'GET', mode: 'cors'}).then( response => {
      return response.json();
    }).then(json => {
      properties  = json.properties.map( p => {
        return <tr key={p.id}>
              <td>{p.airbnb_id}</td><td>{p.income}</td>
              <td>{p.numberOfBathrooms}</td><td>{p.numberOfBedrooms}</td>
              <td>
                  <Link to={property_url + p.id}>
                      <button style={{marginLeft: '5px'}} className="btn btn-default btn-sm">
                          <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                      </button>
                  </Link>
                  <Link to={property_url + p.id + '/edit'}>
                      <button style={{marginLeft: '5px'}}  className="btn btn-primary btn-sm"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></button> 
                  </Link>
                  <button style={{marginLeft: '5px'}} className="btn btn-danger btn-sm" onClick={this.removeProperty.bind(this, p.id)}>
                      <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                  </button>
              </td>
            </tr>
      });
      this.setState({properties});
    }).catch(function(err) {
      console.log(err.message);
    });
  }

  removeProperty(id){
    if(confirm('You really want to delete this property?')){
        let status = null;
        let property_url = url.replace('_id_', id);
        fetch(property_url + id, {method: 'DELETE', mode: 'cors'}).then( response => {
            status = response.status;
            return response.json();
        }).then(json => {
            switch(status){
                default:
                    this.getHosts(this.state.id);
            }
        }).catch(err => {
            console.log(err.message)
        })
    }
}

  render() {
    return (
      <div>
        <h2>Properties</h2>
        <Link to={`/`}><button style={{marginBottom:'10px'}}className="btn btn-default pull-left">Hosts</button></Link>
        <Link to={`/hosts/${this.state.id}/properties/add`}><button style={{marginBottom:'10px'}}className="btn btn-default pull-right">Add</button></Link>
        <form></form>
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>Airbnb Id</th>
                <th>Income</th>
                <th>Bathrooms</th>
                <th>Bedrooms</th>
                <th className="col-xs-3">Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.state.properties}
            </tbody>
        </table>
        
      </div>
    );
  }
}
