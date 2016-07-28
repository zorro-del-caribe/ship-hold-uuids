const test = require('tape');
const shiphold = require('ship-hold');
const extension = require('../index');
const uuid = require('node-uuid');

function createModels () {
  const sh = shiphold();

  const Users = sh.model('Users', function (h) {
    return {
      table: 'users',
      columns: {
        id: 'uuid',
        name: 'string'
      }
    };
  });

  const Products = sh.model('Products', function (h) {
    return {
      table: 'products',
      columns: {
        id: 'id',
        sku: 'string'
      }
    };
  });

  return sh;
}

test('add generated uuid', function (t) {
  const sh = createModels();
  const id = uuid.v4();

  extension(sh, {
    generator(){
      return id;
    }
  });

  const actualUserQuery = sh.model('Users')
    .insert({name: 'Laurent'})
    .build()
    .text;

  const actualProductQuery = sh.model('Products')
    .insert({sku: 'foo'})
    .build()
    .text;

  const expectedUsersQuery = `INSERT INTO "users" ( "name", "id" ) VALUES ( 'Laurent', '${id}' ) RETURNING *`;
  const expectedProductsQuery = 'INSERT INTO "products" ( "sku" ) VALUES ( \'foo\' ) RETURNING *';

  t.equal(actualUserQuery, expectedUsersQuery);
  t.equal(actualProductQuery, expectedProductsQuery);
  t.end();
});