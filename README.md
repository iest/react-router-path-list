# react-router-path-list

_A (potentially naive) way to get an array of paths from a [react-router](https://github.com/reactjs/react-router) path definition._


## Usage

Install it: `npm i --save react-router-path-list`.

Then use it:

```js
import pathList from 'react-router-path-list';

const paths = pathList(
  <Route path="/">
    <IndexRoute>
    <Route path="hello">
      <Route path="world"/>
    </Route>
  </Route>
);
// components removed for brevity
```

`paths` will be equal to:
```js
[
  '/',
  '/hello',
  '/hello/world'
]
```

## Why

Probsbly lots of things, but I need it to generate a list of paths for use with [a react static site generator](https://github.com/markdalgleish/static-site-generator-webpack-plugin).

## Contributing

Ideas, comments, and pull requests welcome.
