const MyConstructor = (function() {
  const _private = new WeakMap();

  const internal = (key) => {
    // Initialize if not created
    if (!_private.has(key)) {
        _private.set(key, {});
    }
    // Return private properties object
    return _private.get(key);
  };

  class MyClass {
      constructor(name, house) {
          internal(this).name = name;
          internal(this).house = house;
      }

      getAddress() {
          return internal(this).address;
      }

      setAddress(add) {
          internal(this).address = address;
      }

      getPrice() {
          return internal(this).price;
      }

      setPrice(price) {
          internal(this).price = price;
      }
  }

  return MyClass;
}());
