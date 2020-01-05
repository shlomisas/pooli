class Pool{

    _interval;
    _timer;
    _pool = [];

    constructor({ interval }){
        this._interval = interval;
    }

    start() {

        if(!this._interval) {
            throw new Error(`Invalid interval value: ${this._interval}`);
        }

        this._timer = setInterval(() => {
            try {
                if (this._pool && this._pool.length) {
                    while (this._pool.length) {
                        const {data, cb} = this._pool.pop();

                        if (typeof cb === 'function') {
                            cb(data);
                        }

                    }
                }else{
                    this.stop();
                }
            } catch (e) {

            }
        }, this._interval);
    }

    stop(){
        if(this._timer){
            clearInterval(this._timer);
            this._timer = null;
        }
    }

    add({data, cb}) {
        this._pool.push({data, cb});
    }

    remove({data, cb}) {
        try {
            for (let i = 0; i < this._pool.length; i++) {
                const {data: _data, cb: _cb} = this._pool[i];
                if (JSON.stringify(data) === JSON.stringify(_data) && cb === _cb) {
                    this._pool.splice(i, 1);
                }
            }
        } catch (e) {
            // no-op
        }
    }

    dispose(){

        if(this._timer){
            clearInterval(this._timer);
            this._timer = null;
        }

        if(this._pool){
            this._pool = null;
        }
    }
}

export default {
    Pool
};
