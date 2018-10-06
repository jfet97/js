if(weird == 10 && weird == 20 && weird == 30) {
  // entra in questo blocco
}

/*
  soluzione 1: 
*/

Object.defineProperty(this || window || global, 'weird', {
  get: function() {
        let counter = 0;
        return function() {
          return counter += 10;
        }
      }(),
});

/*
  soluzione 2:
*/

let weird = [10, 20, 30];

weird.valueOf = weird.shift; // == richiama per prima valueOf()
// oppure
weird.toString = weird.shift; // == richiama per seconda toString()
// oppure
weird.join = weird.shift; // toString normale richiama join()


/*
  soluzione 3:
*/

let weird = {
  valueOf: function() {
            let counter = 0;
            return function() {
              return counter += 10;
            }
          }(),
}
