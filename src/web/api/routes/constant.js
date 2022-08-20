const root = '/api';

const loginRouterPath = root + '/login';
const logoutRouterPath = root + '/logout';

const newUserRouterPath = root + '/user/new';
const allUserRouterPath = root + '/user/all';
const getUserRouterPath = root + '/user/:id';
const updateUserRouterPath = root + '/user/:id';
const deleteUserRouterPath = root + '/user/:id';

const newCollectionRouterPath = root + '/collection/new';
const allCollectionRouterPath = root + '/collection/all';

const newLinkRouterPath = root + '/link/new';
const allLinkRouterPath = root + '/link/all';

const newTagRouterPath = root + '/tag/new';
const allTagRouterPath = root + '/tag/all';

export {
  loginRouterPath,
  logoutRouterPath,
  newUserRouterPath,
  allUserRouterPath,
  getUserRouterPath,
  updateUserRouterPath,
  deleteUserRouterPath,
  newCollectionRouterPath,
  allCollectionRouterPath,
  newLinkRouterPath,
  allLinkRouterPath,
  newTagRouterPath,
  allTagRouterPath,
};
