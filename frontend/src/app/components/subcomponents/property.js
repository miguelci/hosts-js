import React, {Component} from 'react';

export default class Property extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <input type="hidden" name="id" value={this.props.id} />
                <input type="hidden" name="host_id" value={this.props.host_id} />
            
                <div className="form-group">
                    <label htmlFor="airbnb_id">Airbnb Id</label>
                    <input type="text" className="form-control" name="airbnb_id" placeholder="Airbnb Id" onChange={this.props.update.bind(this)} value={this.props.airbnb_id} />
                </div>
                <div className="form-group">
                    <label htmlFor="airbnb_id">Bathrooms</label>
                    <input type="text" className="form-control" name="numberOfBathrooms" placeholder="Bathrooms" onChange={this.props.update.bind(this)} value={this.props.numberOfBathrooms} />
                </div>
                <div className="form-group">
                    <label htmlFor="airbnb_id">Bedrooms</label>
                    <input type="text" className="form-control" name="numberOfBedrooms" placeholder="Bedrooms" onChange={this.props.update.bind(this)} value={this.props.numberOfBedrooms} />
                </div>
                <div className="form-group">
                    <label htmlFor="airbnb_id">Income</label>
                    <input type="text" className="form-control" name="income" placeholder="Income" onChange={this.props.update.bind(this)} value={this.props.income} />
                </div>
            </div>
        )
    }
}