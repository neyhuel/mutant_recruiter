const {Datastore} = require('@google-cloud/datastore');

// Instantiate a datastore client
const datastore = new Datastore();

var mutantService = {};

/**
 * Insert a person record into the database.
 *
 * @param {object} person. The person record to insert.
 */
mutantService.insertPerson = person => {
  return datastore.upsert({
    key: datastore.key('person'),
    data: person,
  });
};

mutantService.findByDNA = dna => {
 const query = datastore
   .createQuery('person')
   .filter('dna', '=', dna[0])
   .filter('dna', '=', dna[1])
   .filter('dna', '=', dna[2])
   .filter('dna', '=', dna[3])
   .filter('dna', '=', dna[4])
   .filter('dna', '=', dna[5]);
 return datastore.runQuery(query);
};

mutantService.getPersonsQuantity = () => {
  const query = datastore
    .createQuery('person')
    .filter('isMutant', '=', false);

  return datastore.runQuery(query);
};

mutantService.getMutantsQuantity = () => {
  const query = datastore
    .createQuery('person')
    .filter('isMutant', '=', true);
  return datastore.runQuery(query);
};

module.exports = mutantService;
