import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const { API } = require('./../../config');

export default class Host extends Component{

    constructor(props){
        super(props);

        let host = {'id': '', 'name': ''};
        let edit = false;
        if(props.match.params.id !== undefined){
            host.id = props.match.params.id;
            edit = true;
        }
        this.state = {
            host,
            edit,
            response: {
                error: false,
                message: ''
            }
        }
    }

    componentDidMount(){
        let host = this.state.host;
        if(host.id !== ''){
            fetch(API + host.id, {method: 'GET', mode: 'cors'}).then( response => {
                return response.json();
              }).then(json => {
                  let host = json.hosts[0];
                  this.setState({host});
              }).catch(function(err) {
                console.log(err.message);
              });
        }
    }

    handleInputChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;
    
        let host = this.state.host;
        this.setState({host: {
            ...host,
            [name]: value
        }});
      }

    updateHost(){
        let edit = this.state.edit;
        let method = edit ? 'PUT' : 'POST';
        let host = this.state.host;
        let status = null;
        fetch(API + host.id, {method, mode: 'cors', body: JSON.stringify(host),
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
                    this.setState({response:{'error': false, message: 'Host submitted'}});
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
            return <div className="alert alert-warning" role="alert">{message}</div>
        }
        return <div className="alert alert-success" role="alert">{message}</div>
    }

    render(){
        return(
            <div>
                <ul className="nav nav-pills">
                    <button className="btn btn-default"><Link to={'/'}>Hosts</Link></button>
                </ul>
                <h2>Add new host</h2>
                <input type="hidden" value={this.state.host.id}/>
                <div className="form-group">
                <label htmlFor="name">Name</label>
                    <input type="text" 
                        onChange={this.handleInputChange.bind(this)} 
                        className="form-control" name="name" placeholder="Name"
                        value={this.state.host.name} />
                </div>
                <button type="submit" className="btn btn-default" onClick={this.updateHost.bind(this)}>Submit</button>
                <div className="col-xs-12" style={{marginTop:'10px'}}>
                    {this.getMessage()}
                </div>
            </div>
        )
    }

 }