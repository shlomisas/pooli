const { Pool } = require('../src/index').default;
const { assert } = require('chai');
const sinon = require('sinon');

describe('Test pool', () => {

    let _pool;

    it('check init: zero interval throw error', () => {

        _pool = new Pool({ interval: 0 });

        assert.throws(() => {
            _pool.start()
        }, Error);
    });

    it('check init: valid internal to start the timer', () => {
        _pool = new Pool({ interval: 10 });
        _pool.start();
        assert.isDefined(_pool._timer);
    });

    it('check dispose: timer is not defined', () => {
        _pool = new Pool({ interval: 10 });
        _pool.start();
        _pool.add({ data: {a: 1, b: 2}, cb: () => {} });

        _pool.dispose();
        assert.isNull(_pool._timer);
        assert.isNull(_pool._pool);
    });

    it('check add: pool has items', () => {
        _pool = new Pool({ interval: 10 });
        _pool.start();
        _pool.add({ data: {a: 1, b: 2}, cb: () => {} });
        _pool.add({ data: {a: 1, b: 2}, cb: () => {} });
        _pool.add({ data: {a: 1, b: 2}, cb: () => {} });

        assert.isDefined(_pool._timer);
        assert.lengthOf(_pool._pool, 3);
    });

    it('check add: pool become empty', (done) => {

        const interval = 5;
        const items = 3;

        _pool = new Pool({ interval });
        _pool.start();

        for(let i=0;i<items;i++){
            _pool.add({ data: {a: 1, b: 2}, cb: () => {} });
        }

        setTimeout(() => {
            assert.isNull(_pool._timer);
            assert.isEmpty(_pool._pool);
            done();
        }, interval*items+1);
    });

    it('check remove', () => {

        const items = [
            { data: {a: 1, b: 2}, cb: () => {} },
            { data: {a: 1, b: 2}, cb: () => {} }
        ];

        _pool = new Pool({ interval: 10 });
        _pool.start();

        for(let i=0;i<items.length;i++){
            _pool.add(items[i]);
        }

        _pool.remove(items[0]);

        assert.isDefined(_pool._timer);
        assert.lengthOf(_pool._pool, 1);
    });

    it('check actual run', (done) => {

        const interval = 10;

        let cb1Spy = sinon.spy();
        let cb2Spy = sinon.spy();

        const items = [
            { data: {a: 1, b: 2}, cb: cb1Spy },
            { data: {a: 1, b: 2}, cb: cb2Spy }
        ];

        _pool = new Pool({ interval: 10 });
        _pool.start();

        for(let i=0;i<items.length;i++){
            _pool.add(items[i]);
        }

        setTimeout(() => {
            assert(cb1Spy.calledOnce);
            assert(cb2Spy.calledOnce);

            assert.isNull(_pool._timer);
            assert.isEmpty(_pool._pool);

            done();

        }, interval*items.length+11);
    });

    afterEach(() => {
        _pool.dispose();
    })
});
