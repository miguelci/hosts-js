import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Property from './property';
import Address from './address';

const { API } = require('./../../config');

export default class PropertyForm extends Component{

    constructor(props){
        super(props);

        let hid = props.match.params.id;
        let property = {'id': '', host_id: hid};
        let edit = false;
        if(props.match.params.pid !== undefined){
            property.id = props.match.params.pid;
            edit = true;
        }
        this.state = {
            property: {...property, airbnb_id: '', host_id: hid, income: '', numberOfBathrooms: '', numberOfBedrooms: ''},
            address: {city:'', country: '', id:'',line_one:'', line_two:'', line_three:'', line_four:'', property_id: property.id || '', post_code: ''},
            edit,
            response: {
                error: false,
                message: ''
            },
            back_url: `/hosts/${hid}`
        }
    }

    componentDidMount(){
        let property = this.state.property;
        if(property.id !== ''){
            fetch(API + `${property.host_id}/properties/${property.id}`, {method: 'GET', mode: 'cors'}).then( response => {
                return response.json();
              }).then(json => {
                  console.log(json.property)
                  let property = json.property;
                  let address = json.address;
                  this.setState({property, address});
              }).catch(function(err) {
                console.log(err.message);
              });
        }
    }

    handleInputChange(event, type){
        const target = event.target;
        const name = target.name;
        const value = target.value;
    
        let object = this.state[type];
        this.setState({[type]: {
            ...object,
            [name]: value
        }});
      }

      handlePropertyChange(event){
          this.handleInputChange(event, 'property');
      }

      handleAddressChange(event){
        this.handleInputChange(event, 'address');
    }

      updateProperty(){
        let edit = this.state.edit;
        let method = edit ? 'PUT' : 'POST';
        let address = this.state.address;
        let property = this.state.property;
        let status = null;
        fetch(API + `${property.host_id}/properties/${property.id}`, {method, mode: 'cors', body: JSON.stringify({...property, ...address}),
                headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                })
        }).then( response => {
            status = response.status;
            return response.json();
        }).then(json => {
            switch(status){
                case 200:
                case 201:
                    this.setState({response:{'error': false, message: 'Property submitted'}});
                    break;
                default:
                    this.setState({response:{'error': true, message: json.message}})
            }
          }).catch(function(err) {
            console.log(err.message);
          });
    }

    getMessage(){
        let message = this.state.response.message;
        if (message === ''){
            return '';
        }
        let error = this.state.response.error;

        if(error){
            return <div className="alert alert-warning" role="alert">{message.map(m => {
                return <span class="help-block">{m}</span>
            })}</div>
        }
        return <div className="alert alert-success" role="alert">{message}</div>
    }

    render(){
        return(
            <div>
                <Link to={this.state.back_url}>
                    <button type="button" className="btn btn-default pull-left">Properties</button>
                </Link>
                <div className="col-xs-12">
                <input type="hidden" value={this.state.property.id}/>
                <div className="col-xs-6">
                    <h2>Property</h2>
                    <Property {...this.state.property} update={this.handlePropertyChange.bind(this)} />
                </div>
                <div className="col-xs-6">
                    <h2>Address</h2>
                    <Address {...this.state.address} update={this.handleAddressChange.bind(this)} />
                </div>
                <button type="submit" className="btn btn-primary pull-right" onClick={this.updateProperty.bind(this)}>Submit</button>
                <div className="col-xs-12" style={{marginTop:'10px'}}>
                    {this.getMessage()}
                </div>
            </div>
            </div>
        )
    }

 }