'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pathList = pathList;
var deSlash = function deSlash(str) {
  return str.replace(/\//g, '');
};

function getPath(child) {
  var parentPath = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  var props = child.props;
  if (!props) throw new Error('No props');

  var paths = [];
  var childPath = props.path;

  if (!childPath) return [];

  var fullPath = [parentPath === '/' ? null : parentPath, deSlash(childPath)].join('/');

  paths.push(fullPath);

  if (props.children) {
    if (Array.isArray(props.children)) {
      props.children.forEach(function (ch) {
        return getPath(ch, fullPath).forEach(function (path) {
          return paths.push(path);
        });
      });
    } else {
      getPath(props.children, fullPath).forEach(function (path) {
        return paths.push(path);
      });
    }
  }
  return paths;
}

function pathList(routes) {
  if (!routes || !routes.type || routes.type.displayName !== 'Route') {
    throw new Error('\'routes\' must be a valid routes definition. You passed "' + routes + '"');
  }

  return getPath(routes);
}
