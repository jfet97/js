const delay = function (n) {
    return new Promise(ok => {
        setTimeout(() => ok(n), n * 1000);
    })
}

function createAsyncIterable() {
    return {
        async *[Symbol.asyncIterator]() {
            let n = 0;
            while (1) {
                await delay(3);
                yield n++;
            }
        }
    }
}



class Test extends Array {
    constructor(...args) {
        super(...args);
        this[Symbol.for('callbacks')] = [];
    }

    async push(...args) {
        super.push(...args);
        return await Promise.all(this[Symbol.for('callbacks')].map(cb => cb(...args)));
    }

    add(...cb) {
        this[Symbol.for('callbacks')].push(...cb);
        return this;
    }
}



(async function IIAFE() {
    // create an async iterable that produces numbers
    const asyncIterable = createAsyncIterabl();

    const test = new Test();

    const plusOne = n => {
        console.log("plusOne: ", n + 1);
    }

    const double = async n => {
        await delay(5);
        console.log("double: ", n * 2)
    }

    test.add(plusOne, double);

    for await (const n of asyncIterable) {
        console.log('n is: ', n);
        await test.push(n);
    }

})();

