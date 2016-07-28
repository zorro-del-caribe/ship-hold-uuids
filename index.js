const uuid = require('node-uuid');

module.exports = function (sh, options = {}) {
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

  return sh;
};