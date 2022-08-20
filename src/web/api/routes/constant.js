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
const getCollectionRouterPath = root + '/collection/:id';
const updateCollectionRouterPath = root + '/collection/:id';
const deleteCollectionRouterPath = root + '/collection/:id';

const newLinkRouterPath = root + '/link/new';
const allLinkRouterPath = root + '/link/all';
const getLinkRouterPath = root + '/link/:id';
const updateLinkRouterPath = root + '/link/:id';
const deleteLinkRouterPath = root + '/link/:id';

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
  getCollectionRouterPath,
  updateCollectionRouterPath,
  deleteCollectionRouterPath,
  newLinkRouterPath,
  allLinkRouterPath,
  getLinkRouterPath,
  updateLinkRouterPath,
  deleteLinkRouterPath,
  newTagRouterPath,
  allTagRouterPath,
};
