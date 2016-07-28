# ship-hold-uuids

[![CircleCI](https://circleci.com/gh/zorro-del-caribe/ship-hold-uuids.svg?style=svg)](https://circleci.com/gh/zorro-del-caribe/ship-hold-uuids)

Generate random uuids when inserting a new item whose primary key is a uuid. (for [ship-hold](https://gihtub.com/gh/zorro-del-caribe/ship-hold) data access framework)

## install

``npm install ship-hold-uuids``

## usage

```
const Users = sh.model('users',function(h){
    table:'users',
    columns:{
        id:'uuid'
    }
});

Users
    .insert({name:'Laurent')
    .build();

// INSERT INTO "users" ('id','name') VALUES ('some random uuid','Laurent')


 options to pass to the factory
 
 * key: the property corresponding to the primary key (default "id")
 * generator: the id generator function (default [node-uuid](https://github.com/broofa/node-uuid) - v4)


