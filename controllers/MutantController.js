var personService = require('../services/PersonService');
//
// const {Datastore} = require('@google-cloud/datastore');
//
// // Instantiate a datastore client
// const datastore = new Datastore();

// Pattern of mutant nitrogenous base
var pattern = /(A|T|G|C)\1{3}/;

var mutantController = {};

// Mutant DNA order
var n = 6;
// Length of mutant nitrogenous base
var mutant_nb = 4;
// Minimun quantity of mutant nitrogenous base
var min_mutant_nb = 1;

mutantController.isMutant = async function(req, res, next){
  // Variables declarations
  // Quantity of mutant nitrogenous base encountered
  var mutant_dna = 0;
  // Human DNA
  var dna = req.body.dna
  // Control variables
  var i, j;

  // Validar que las cadenas estan compuestas por A, T, G o C

  // Horzintal
  dna.forEach( (base, index) => {
      if (base.match(pattern)) {
        mutant_dna ++;
      }
  });

  // Vertical
  for (i = 0; i < dna.length; i++) {
    base =  dna[0].substring(i,i+1) +
            dna[1].substring(i,i+1) +
            dna[2].substring(i,i+1) +
            dna[3].substring(i,i+1) +
            dna[4].substring(i,i+1) +
            dna[5].substring(i,i+1);
    if (base.match(pattern)) {
      mutant_dna ++;
    }
  }

  // Forward diagonals
  // First row
  i = 0;
  for (j = 0; j < mutant_nb-1; j++) {
    base = forward_diagonal(dna, i, j);
    if (base.match(pattern)) {
      mutant_dna ++;
    }
  }

  // First column
  j = 0;
  for (i = 1; i < mutant_nb-1; i++) {
    if (forward_diagonal(dna, i, j).match(pattern)) {
      mutant_dna ++;
    }
  }

  // Reverse diagonals
  // First row
  i = 0;
  for (j = n-1; j >= mutant_nb-1; j--) {
    if (reverse_diagonal(dna, i, j).match(pattern)) {
      mutant_dna ++;
    }
  }

  // Last column
  j = 5;
  for (i = 1; i < mutant_nb-1; i++) {
    if (reverse_diagonal(dna, i, j).match(pattern)) {
      mutant_dna ++;
    }
  }

  if(mutant_dna > min_mutant_nb){
    console.log("¡¡¡Recluted!!!");
  }
  else{
    console.log("¡¡¡Get away from me, homosapiens!!!");
  }

  try {
    await personService.findByDNA(dna)
    .then(async (r) => {
      if(r[0].length == 0){
        await personService.insertPerson({ dna: dna, isMutant: mutant_dna > min_mutant_nb })
      }
    })
    .catch((e) => { console.log(e); } )
  } catch (error) {
    next(error);
  }
  // try {
  //   // base = "";
  //   // for(var x; x < dna.length; x++){
  //   //   base += (x == dna.length - 1) ? dna[x] : dna[x] + ',';
  //   // }
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send(error.message).end();
  // }

  // Is Mutant?
  if (mutant_dna > min_mutant_nb){
    res.status(200).send('OK').end();
  }else{
    res.status(403).send('Forbidden').end();
  }
};

mutantController.stats = async function(req, res, next){
  let count_mutant;
  let count_human;
  let ratio;
  try {
    await personService.getMutantsQuantity()
      .then(async (r) => {
        console.log(r)
        count_mutant = r[0].length;
        await personService.getPersonsQuantity()
          .then(async (r) => {
            console.log(r)
            count_human = r[0].length;
            var result = {
              count_mutant_dna: count_mutant,
              count_human_dna: count_human,
              ratio: count_mutant/count_human
            }
            res.status(200).send(result).end();
          })
          .catch((e) => { console.log(e); } )
      })
      .catch((e) => { console.log(e); } )
  } catch (error) {
    next(error);
  }
}

// Support methods
function forward_diagonal(dna, x, y){
  let diagonal_base = "";
  do {
    diagonal_base += dna[x].substring(y,y+1);
    x++;
    y++;
  } while (x < n && y < n);
  return diagonal_base;
}

function reverse_diagonal(dna, x, y){
  let diagonal_base = "";
  do {
    diagonal_base += dna[x].substring(y,y+1);
    x++;
    y--;
  } while (x < n && y >= 0);
  return diagonal_base;
}

module.exports = mutantController;
