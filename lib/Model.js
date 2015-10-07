var datastore = require('../lib/DataStore.js');

function Model(schema) {
  this.schema = schema;
  this.id = null;
  for ( key in schema) {
    this[key] = null;
  }

  if (!datastore.store.hasOwnProperty(this.constructor.name)) {
    datastore.store[this.constructor.name] = [];
  }
}

Model.prototype.destroy = function() {
  datastore.store[this.constructor.name].splice(this.id - 1, 1, null);
};

Model.getNextId = function() {
  return datastore.store[this.name].length + 1;
};

Model.prototype.save = function() {
  if (this.id === null) {
    this.id = this.constructor.getNextId();
    datastore.store[this.constructor.name].push(this);
  }
};

Model.find = function(id) {
  return datastore.store[this.name][id - 1];
};

Model.extend = function(klass) {
  for (methodName in Model) {
    klass[methodName] = Model[methodName];
  }
  klass.prototype = Object.create(Model.prototype, {
    constructor : {
      value : klass
    }
  });
}

module.exports = Model;