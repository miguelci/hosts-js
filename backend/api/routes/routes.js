
module.exports = function(app) {
  const hosts = require('../controllers/hosts');
  const hostProperties = require('../controllers/hostProperties');

  app.route('/')
    .get(hosts.index);

  app.route('/hosts/dashboard')
    .get(hosts.dashboard);

  app.route('/hosts')
    .get(hosts.hosts)
    .post(hosts.addHost);

  app.route('/hosts/:id')
    .get(hosts.hostById)
    .delete(hosts.deleteHost)
    .put(hosts.updateHost);

  app.route('/hosts/:id/properties')
    .get(hostProperties.hostProperties)
    .post(hostProperties.addProperty);

  app.route('/hosts/:id/properties/:pid')
    .get(hostProperties.hostPropertyById)
    .delete(hostProperties.deleteProperty)
    .put(hostProperties.updateProperty);

  app.route('/hosts/:id/properties/:pid/versions')
    .get(hostProperties.hostPropertyVersionsById);

}
