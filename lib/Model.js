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
  console.log(datastore.store);
}

Model.prototype.save = function() {
  if (this.id === null) {
    datastore.lastIdNum += 1;
    this.id = datastore.lastIdNum;
    datastore.store[this.constructor.name].push(this);
  }
};

Model.prototype.destroy = function(id) {
  if (this.id !== null) {
    for (var i = 0; i < datastore.store[this.constructor.name].length; i++) {
      if (datastore.store[this.constructor.name][i].id === id) {
        datastore.store[this.constructor.name].splice(i, 1);
      }
    }
  }
};

Model.getNextId = function() {
  return datastore.lastIdNum + 1;
};

Model.find = function(id) {
  if (this.id !== null) {
    for (var i = 0; i < datastore.store.Model.length; i++) {
      if (datastore.store.Model[i].id === id) {
        return datastore.store.Model[i];
      }
    }
  }
};

module.exports = Model;