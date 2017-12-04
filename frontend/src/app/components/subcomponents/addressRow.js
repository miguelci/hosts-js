import React, {Component} from 'react';
import { randomBytes } from 'crypto';

export default class Address extends Component {
    constructor(props){
        super(props)
    }

    getAddress(){

        let obj = this.props;
        return Object.keys(obj).map( key =>  {
            return obj[key];
        }).map( (v,idx)  => {
            return <div key={idx}>{v}</div>
        });
    }

    render(){
        return(
            <div>
                {this.getAddress()}
            </div>
        )
    }
}