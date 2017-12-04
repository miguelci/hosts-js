import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const { API } = require('./../config');

export default class Dashboard extends Component{

    constructor(){
        super();
        this.state = {
            dashboardHosts: []
        }
    }

    componentWillMount(){
        this.getRows();
    }

    getRows(){
        fetch(API + 'dashboard', {method: 'GET', mode: 'cors'}).then( response => {
            return response.json();
          }).then(json => {
            let data = json.dashboard.map( d => {
              return <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.properties}</td>
                <td>{d.income}</td>
                <td>
                    <Link to={'/hosts/' + d.id}>
                        <button style={{marginLeft: '5px'}} className="btn btn-default btn-sm">
                            <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                        </button>
                    </Link>
                    <Link to={'/hosts/' + d.id + '/edit'}>
                        <button style={{marginLeft: '5px'}}  className="btn btn-primary btn-sm"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></button> 
                    </Link>
                    <button style={{marginLeft: '5px'}} className="btn btn-danger btn-sm" onClick={this.removeHost.bind(this, d.id)}>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
                </td>
              </tr>
            });
            this.setState({dashboardHosts: data});
          }).catch(function(err) {
            console.log(err.message);
          });
    }


    removeHost(id){
        if(confirm('You really want to delete this host?')){
            let status = null;
            fetch(API + id, {method: 'DELETE', mode: 'cors'}).then( response => {
                status = response.status;
                return response.json();
            }).then(json => {
                switch(status){
                    default:
                        this.getRows();
                }
            }).catch(err => {
                console.log(err.message)
            })
        }
    }


    render(){
        return(
            <div>
                <h2>Dashboard</h2>
                <Link to={'/hosts/add'}><button style={{marginBottom:'10px'}}className="btn btn-default pull-right">Add</button></Link>
                <table className="table table-bordered" >
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Properties</th>
                        <th>Income</th>
                        <th className="col-xs-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.dashboardHosts}
                    </tbody>
                </table>
            </div>
        )
    }
}