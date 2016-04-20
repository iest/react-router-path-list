import {Route, IndexRoute} from 'react-router';

const hasLeadingSlash = str => str.charAt(0) === '/';
const hasTrailingSlash = str => str.charAt(str.length - 1) === '/';
const preSlash = str => hasLeadingSlash(str)
  ? str
  : '/' + str;
const postSlash = str => hasTrailingSlash(str)
  ? str
  : str + '/';
const deSlash = str => str.replace(/\//g, '');

function getPath(child, parentPath = '') {
  const props = child.props;
  if (!props) throw new Error('No props');

  const paths = [];
  const childPath = props.path;
  const fullPath = [
    parentPath === '/'
      ? null
      : parentPath,
    deSlash(childPath),
  ].join('/')

  paths.push(fullPath);

  if (props.children) {
    if (Array.isArray(props.children)) {
      props.children.forEach(ch =>
        getPath(ch, fullPath).forEach(path => paths.push(path))
      )
    } else {
      getPath(props.children, fullPath).forEach(path => paths.push(path))
    }
  }
  return paths;
}

export default function pathList(routes) {
  if (
    !routes ||
    !routes.type ||
    routes.type.displayName !== 'Route'
  ) {
    throw new Error(`'routes' must be a valid routes definition. You passed "${routes}"`)
  }

  return getPath(routes);
}