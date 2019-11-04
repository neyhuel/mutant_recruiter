// Pattern of mutant nitrogenous base
var pattern = /(A|T|G|C)\1{3}/;

var mutantController = {};

// Mutant DNA order
var n = 6;
// Length of mutant nitrogenous base
var mutant_nb = 4;
// Quantity of mutant nitrogenous base encountered
var mutant_dna = 0;
// Minimun quantity of mutant nitrogenous base
var min_mutant_nb = 1;

mutantController.isMutant = function(req, res){
  // Variables declarations

  var dna = req.body.dna
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

  // Is Mutant?
  if (mutant_dna > min_mutant_nb){
    res.status(200).send('OK').end();
  }else{
    res.status(403).send('Forbidden').end();
  }
};

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
