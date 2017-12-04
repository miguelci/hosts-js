const db = require('../db');

const Host = require('../models/Host');
const Property = require('../models/Property');
const Address = require('../models/Address');
const Version = require('../models/Version');

const PropertyRules = require('./validation/property');
const AddressRules = require('./validation/address');
const LinkRules = require('./validation/link');

const {OK, CREATED, NO_CONTENT, BAD_REQUEST, SERVER_ERROR} = require('../status');

exports.hostProperties = (req, res) => {
  const id = req.params.id;

  const host = new Host(id);
  host.properties(result => {
    if(!result.error){
      return res.status(OK).json({'properties': result.properties, 'rows': result.rows});
    }
    res.status(BAD_REQUEST).json({'message': result.message});
  });
};

exports.hostPropertyById = (req, res) => {
  const hid = req.params.id;
  const pid = req.params.pid;

  const host = new Host(hid);
  host.property(pid, result => {
    if(result.error){
      return res.status(BAD_REQUEST).json({'message': result.message});
    }

    Address.findByPropertyId(pid, address => {
      if(!result.error){
        return res.status(OK).json({'property': result.properties[0], 'address': address.addresses[0]});
      }
      return res.status(BAD_REQUEST).json({'message': result.message});
    })
  });
};

exports.addProperty = (req, res) => {
  const hid = req.params.id;
  
  let airbnb_id = req.body.airbnb_id;
  let bathrooms = req.body.numberOfBathrooms;
  let bedrooms = req.body.numberOfBedrooms;
  let income = req.body.income;

  let line_one = req.body.line_one;
  let line_two = req.body.line_two;
  let line_three = req.body.line_three;
  let line_four = req.body.line_four;
  let post_code = req.body.post_code;
  let city = req.body.city;
  let country = req.body.country;

  let property = new Property(null, airbnb_id, bathrooms, bedrooms, income, hid);
  let address = new Address(null, line_one, line_two, line_three, line_four, post_code, city, country);
  
  let errors = PropertyRules.evaluateRules(property);
  errors = errors.concat(AddressRules.evaluateRules(address));

  LinkRules.evaluateRules(property, result => {
    errors = errors.concat(result);

    if(errors.length) {
      return res.status(BAD_REQUEST).json({message: errors})
    }
    
    property.addPropertyToHost(result => {
      if(result.error){
        return res.status(BAD_REQUEST).json({'message': result.message});
      }
      property.id = result.id;
      address.property_id = result.id;

      address.addAddressToProperty(result => {
        if(!result.error){
          addVersion(hid, property, address);
          return res.status(CREATED).json({'message': result});
        }
        return res.status(BAD_REQUEST).json({'message': result.message});
      });
    });
  });
}

exports.deleteProperty = (req, res) => {
  const pid = req.params.pid;
  if(pid === undefined) {
    return res.status(BAD_REQUEST).json({message: "Must choose a property to delete."})
  }
  
  Property.delete(pid, (result) => {
    console.log(result)
    if(!result.error){
      return res.status(OK).json(result);
    }
    res.status(BAD_REQUEST).json({'message': result.message});
  });
}


exports.updateProperty = (req, res) => {
  const hid = req.params.id;
  const pid = req.params.pid;
  
  let property = new Property(pid, req.body.airbnb_id, req.body.numberOfBathrooms, req.body.numberOfBedrooms, req.body.income, hid);
  let address = new Address(req.body.id, req.body.line_one, req.body.line_two, req.body.line_three, req.body.line_four, req.body.post_code, req.body.city, req.body.country, pid);
  
  let errors = PropertyRules.evaluateRules(property);
  errors = errors.concat(AddressRules.evaluateRules(address));

  LinkRules.evaluateRules(property, result => {
    errors = errors.concat(result);

    if(errors.length) {
      return res.status(BAD_REQUEST).json({message: errors})
    }
    
    property.update(result => {
      if(result.error){
        return res.status(BAD_REQUEST).json({'message': result.message});
      }

      address.update(result => {
        if(!result.error){
          addVersion(hid, property, address);
          return res.status(OK).json({'rows': result.rows});
        }
        return res.status(BAD_REQUEST).json({'message': result.message});
      });
    });
  });
}

exports.hostPropertyVersionsById = (req, res) => {
  const pid = req.params.pid;

  Version.find(pid, result => {
      if(!result.error){
        return res.status(OK).json({'versions': result.properties_versions.map(v => {
          return {
            property_id: v.property_id,
            data: JSON.parse(v.data),
            version: v.version
          }
        })});
      }
      return res.status(BAD_REQUEST).json({'message': result.message});
    })
}

function addVersion(host_id, property, address){
    Host.find(host_id, result => {
      let version = new Version(property.id, {
        'name': result.hosts[0].name,
        'address': address.toArray(),
        'income': property.income,
        'airbnb_id': property.airbnb_id,
        'numberOfBathrooms': property.numberOfBathrooms,
        'numberOfBedrooms': property.numberOfBedrooms
      });
      version.addVersion();
    });
}