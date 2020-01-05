# General

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] ![node](https://travis-ci.org/shlomisas/pooli.svg?branch=master)
<!--[![Coveralls Status][coveralls-image]][coveralls-url] -->
<!--[![OpenCollective Backers][backer-badge]][backer-url] [![OpenCollective Sponsors][sponsor-badge]][sponsor-url] -->

PoolJS allows you to run tasks on timer based pool and make them done on each interval

# Install

`npm i pooli -S`

# Usage

> Normal usage

```javascript

const { Pool } = require('pooli');

// Initiate the pool to tick and look for tasks every 1000ms
const pool = new Pool({ interval: 1000 });

// Start the pool (start the timer)
pool.start();

pool.add({ data: { a: 1, b: 2 }, cb: ({ a, b }) => {
    console.log(`got a: ${a} and b: ${b}`); // prints got a: 1 and b: 2
});

const data = { a: 3, b: 4 };
const cb = ({ a, b }) => {
   console.log(`got a: ${a} and b: ${b}`); // won't print due to remove below
};

pool.add({ data, cb });
pool.remove({ data, cb });

```

> Stop the pool

```javascript

const { Pool } = require('pooli');

// Initiate the pool to tick and look for tasks every 1000ms
const pool = new Pool({ interval: 1000 });

// Start the pool (start the timer)
pool.start();

pool.add({ data: { a: 1, b: 2 }, cb: ({ a, b }) => {
    console.log(`got a: ${a} and b: ${b}`); // prints got a: 1 and b: 2
});

// This will stop the timer inside the pool but won't clear the tasks
pool.stop();

// This will start the pool and the timer inside it so the do the tasks
pool.start();

```

> Dispose the pool

```javascript

const { Pool } = require('pooli');

// Initiate the pool to tick and look for tasks every 1000ms
const pool = new Pool({ interval: 1000 });

// Start the pool (start the timer)
pool.start();

pool.add({ data: { a: 1, b: 2 }, cb: ({ a, b }) => {
    console.log(`got a: ${a} and b: ${b}`); // will never print
});

// This will clear all tasks and stop the timer inside the pool
pool.dispose();

```

