import test from 'tape';
import React from 'react';
import {Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';

import pathList from '../path-list';

const Foo = () => <div/>;

test('Basic behaviour', t => {
  const routes = (
    <Route path="/" component={Foo}>
      <Route path="baxter" component={Foo}/>
      <Route path="dwight" component={Foo}/>
      <Route path="gob" component={Foo}/>
    </Route>
  );

  t.throws(() => pathList('lol'), 'throws when given a non-valid route definition')
  t.ok(Array.isArray(pathList(routes)), 'outputs an array...')

  t.deepEqual(
    pathList(routes),
    ['/', '/baxter', '/dwight', '/gob'],
    '...of the available routes'
  );

  t.end();
});

test('Root path behaviour', t => {
  t.deepEqual(
    pathList(
      <Route path="/baxter" component={Foo}>
        <Route path="ate-a-whole" component={Foo}/>
        <Route path="wheel-of" component={Foo}/>
        <Route path="cheese" component={Foo}/>
      </Route>
    ),
    [
      '/baxter',
      '/baxter/ate-a-whole',
      '/baxter/wheel-of',
      '/baxter/cheese',
    ],
    'works without a trailing slash'
  );

  t.deepEqual(
    pathList(
      <Route path="dwight/" component={Foo}>
        <Route path="schrute" component={Foo}/>
        <Route path="loves" component={Foo}/>
        <Route path="beets" component={Foo}/>
      </Route>
    ),
    [
      '/dwight',
      '/dwight/schrute',
      '/dwight/loves',
      '/dwight/beets',
    ],
    'works with a trailing slash'
  );

  t.deepEqual(
    pathList(
      <Route path="/dwight/" component={Foo}>
        <Route path="schrute" component={Foo}/>
        <Route path="loves" component={Foo}/>
        <Route path="beets" component={Foo}/>
      </Route>
    ),
    [
      '/dwight',
      '/dwight/schrute',
      '/dwight/loves',
      '/dwight/beets',
    ],
    'works with a trailing and leading slash'
  );

  t.end();
});

test('Nested behaviour', t => {
  t.deepEqual(
    pathList(
      <Route path="its" component={Foo}>
        <Route path="the" component={Foo}/>
        <Route path="final" component={Foo}/>
        <Route path="countdown" component={Foo}/>
      </Route>
    ),
    [
      '/its',
      '/its/the',
      '/its/final',
      '/its/countdown',
    ],
    'works with an array of nested routes'
  );

  t.deepEqual(
    pathList(
      <Route path="gob-says" component={Foo}>
        <Route path="look" component={Foo}>
          <Route path="at" component={Foo}/>
        </Route>
        <Route path="banner" component={Foo}>
          <Route path="michael" component={Foo}/>
        </Route>
      </Route>
    ),
    [
      '/gob-says',
      '/gob-says/look',
      '/gob-says/look/at',
      '/gob-says/banner',
      '/gob-says/banner/michael',
    ],
    'works with a mixture of nested routes'
  );
  t.end();
});

test('Other react router route types', t => {
  t.deepEqual(
    pathList(
      <Route path="/" component={Foo}>
        <IndexRoute component={Foo}/>
        <Route path="dorothy-mantooth" component={Foo}/>
        <Route path="is-a" component={Foo}>
          <IndexRedirect to="saint"/>
          <Route path="saint" component={Foo}/>
        </Route>
        <Redirect from="seafood" to="dinner"/>
      </Route>
    ),
    [
      '/',
      '/dorothy-mantooth',
      '/is-a',
      '/is-a/saint',
    ],
    'works with IndexRoute, Redirect, and IndexRedirect'
  );
  t.end();
});
