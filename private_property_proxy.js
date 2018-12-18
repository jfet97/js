class Digit {
  constructor(digit) {

    if((digit < 0)||(digit > 9)) {
      throw new Error('initial value must be 0 >= value <= 9');
    }

      this._digit = digit; 
      return new Proxy(this, {
        get(target, prop, receiver) {
          // receiver == proxy

          if(prop === 'getDigit' || prop === 'setDigit') {
            // 'this' will be the wrapped object instead of the
            // proxy as usual
            // because the proxy prevent the access to _digit 
            return Reflect.get(target, prop).bind(target);
          }

          if(typeof prop == 'string' && [...prop].indexOf('_') == 0) {
            throw new Error('cannot access to a private property');
          } else {
            // this in getters will be the proxied obj
            return Reflect.get(target, prop);
            /**
             * with return Reflect.get(target, prop, receiver);
             * 'this' would have been the proxy
             * and the proxy limits the access to private properties
             */
          }
        },
        set(target, prop, value, receiver) {
          
          if(typeof prop == 'string' && [...prop].indexOf('_') == 0) {
            throw new Error('cannot access to a private property');
          } else {
            // this in setters will be the proxied obj
            return Reflect.set(target, prop, value);
            /**
             * with return Reflect.set(target, prop, value, receiver);
             * 'this' would have been the proxy
             * and the proxy limits the access to private properties
             */
          }
        }
      });
    }

    get digit() {
      // this == wrapped object
      return this._digit;
    }

    set digit(digit) {
      // this == wrapped object
      if((digit < 0)||(digit > 9)) {
        throw new Error('initial value must be 0 >= value <= 9');
      }

      this._digit = digit; 
      return digit;
    }

    getDigit() {
      // this == wrapped object
      return this._digit;
    }

    setDigit(digit) {
      // this == wrapped object
      if((digit < 0)||(digit > 9)) {
        throw new Error('initial value must be 0 >= value <= 9');
      }

      this._digit = digit; 
      return digit;
    }

}

const aDigit = new Digit(3);
aDigit.digit = 4;
aDigit.digit;
aDigit.setDigit(5);
aDigit.getDigit();
