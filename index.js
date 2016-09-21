const uuid = require('node-uuid');

let hasRun = false;

module.exports = function (sh, options = {}) {
  if (!hasRun) {
    const directives = Object.assign({}, {key: 'id', generator: uuid.v4}, options);
    const models = sh.models();
    const proto = Object.getPrototypeOf(sh.model(models[0]));

    const insert = proto.insert;

    proto.insert = function () {
      const definition = this.definition;
      const builder = insert.bind(this)(...arguments);

      if (definition.columns[directives.key].type === 'uuid') {
        builder
          .value(directives.key, directives.generator());
      }
      return builder;
    };
    hasRun = true;
  }
  return sh;
};