'use strict';

module.exports = function(Contacts) {

  Contacts.search = function(term, cb) {

    console.log("entrato");

    /*The search key is a unique field to search a value
    example: {
      name:"Giovanni"
      surname:"Montenegro"
      number:"789"
      alias:"gioAlias"
      search_key:"Giovanni_Montenegro_789_gioAlias"
        }
        Of course a better way to search a contact can be done
    */


    var whereCondition = {
      where: {
        or:[
          {search_key: {like: term, options: "i"}}
        ]
        }
      };

    Contacts.find(whereCondition, function(err, contacts) {

      console.log("contacts: " + contacts);
      cb(null, contacts);
      console.log("Errr: " + err);
    })
  }

  Contacts.remoteMethod('search', {
    accepts: {
      arg: 'term',
      type: 'string'
    },
    http: {
      path: '/search/:term',
      verb: 'get'
    },
    returns: {
      arg: 'contacts',
      type: 'Object'
    }
  })
};
