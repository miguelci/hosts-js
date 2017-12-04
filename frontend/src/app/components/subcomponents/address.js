import React, {Component} from 'react';

export default class Address extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <input type="hidden" name="id" value={this.props.id} />
                <input type="hidden" name="property_id" value={this.props.property_id} />
            
                <div className="form-group">
                    <label htmlFor="line_one">Line One</label>
                    <input type="text" className="form-control" name="line_one" placeholder="Line One" onChange={this.props.update.bind(this)} value={this.props.line_one || ''} />
                </div>
                <div className="form-group">
                    <label htmlFor="line_two">Line Two</label>
                    <input type="text" className="form-control" name="line_two" placeholder="Line Two" onChange={this.props.update.bind(this)} value={this.props.line_two || ''} />
                </div>
                <div className="form-group">
                    <label htmlFor="line_three">Line Three</label>
                    <input type="text" className="form-control" name="line_three" placeholder="Line Three" onChange={this.props.update.bind(this)} value={this.props.line_three || ''} />
                </div>
                <div className="form-group">
                    <label htmlFor="line_four">Line Four</label>
                    <input type="text" className="form-control" name="line_four" placeholder="Line Four" onChange={this.props.update.bind(this)} value={this.props.line_four || ''} />
                </div>
                <div className="form-group">
                    <label htmlFor="post_code">Post Code</label>
                    <input type="text" className="form-control" name="post_code" placeholder="Post Code" onChange={this.props.update.bind(this)} value={this.props.post_code || ''} />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" className="form-control" name="city" placeholder="City" onChange={this.props.update.bind(this)} value={this.props.city || ''} />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input type="text" className="form-control" name="country" placeholder="Country" onChange={this.props.update.bind(this)} value={this.props.country || ''} />
                </div>
            </div>
        )
    }
}