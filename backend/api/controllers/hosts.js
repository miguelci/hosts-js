const db = require('../db');
const Host = require('../models/Host');
const {OK, CREATED, NO_CONTENT, BAD_REQUEST, SERVER_ERROR} = require('../status');

const HostRules = require('./validation/host');

exports.index = (req, res) => {
  res.json("hosts api")
};

exports.dashboard = (req, res) => {
  Host.dashboard(result => {
    if(!result.error){
      return res.status(OK).json(result);
    }
    res.status(BAD_REQUEST).json({'message': result.error});
  })
}

exports.hosts = (req, res) => {
  Host.find(null, (hosts) => {
    if(!hosts.error){
      return res.status(OK).json(hosts);
    }
    res.status(BAD_REQUEST).json({'message': hosts.error});
  });

};

exports.hostById = (req, res) => {
  const id = req.params.id;

  Host.find(id, (hosts) => {
    if(!hosts.error){
      return res.status(OK).json(hosts);
    }
    res.status(BAD_REQUEST).json({'message': hosts.error});
  });
}

exports.addHost = (req, res) => {
  const name = req.body.name;

  let errors = HostRules.evaluateRules(new Host(null, name));
  if(errors.length) {
    return res.status(BAD_REQUEST).json({message: errors})
  }

  Host.create(name, (result) => {
    if(!result.error){
      return res.status(CREATED).json(result);
    }
    res.status(BAD_REQUEST).json({'message': result.message});
  });
}

exports.deleteHost = (req, res) => {
  const id = req.params.id;
  if(id === undefined) {
    return res.status(BAD_REQUEST).json({message: "Must choose an host to delete."})
  }
  Host.delete(id, (result) => {
    if(!result.error){
      return res.status(NO_CONTENT).json(result);
    }
    res.status(BAD_REQUEST).json({'message': result.message});
  });
}

exports.updateHost = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  let errors = HostRules.evaluateRules(new Host(null, name));
  if(errors.length) {
    return res.status(BAD_REQUEST).json({message: errors})
  }

  let host = new Host(id, name);
  Host.update(host, result => {
    if(!result.error){
      return res.status(OK).json({host, 'rows': result.rows});
    }
    res.status(BAD_REQUEST).json({'message': result.message});
  });
}
