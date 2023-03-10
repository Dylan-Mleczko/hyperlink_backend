const root = '/api';

const loginRouterPath = root + '/login';
const logoutRouterPath = root + '/logout';
const registerRouterPath = root + '/register';
const startResestPassword = root + '/start/reset';
const endResestPassword = root + '/end/reset';
const checkEmailExists = root + '/check/email';
const verifyEmailAndCreateUser = root + '/register/verify';

// const newUserRouterPath = root + '/user/new';
const allUserRouterPath = root + '/user/all';
const getUserRouterPath = root + '/user';
const updateUserRouterPath = root + '/user/update';
const deleteUserRouterPath = root + '/user/:id';

const newCollectionRouterPath = root + '/collection/new';
const allUserCollectionsRouterPath = root + '/collection/all';
const getCollectionRouterPath = root + '/collection/:id';
const getCollectionImageTypeRouterPath = root + '/collection/image/:id/:type';
const getCollectionImageRouterPath = root + '/collection/image/:id';
const addTagToCollectionRouterPath = root + '/collection/tag';
const updateCollectionRouterPath = root + '/collection/:id';
const deleteCollectionRouterPath = root + '/collection/:id';

const newLinkRouterPath = root + '/link/new';
const allLinkRouterPath = root + '/link/all/:id';
const getLinkRouterPath = root + '/link/:id';
const updateLinkRouterPath = root + '/link/:id';
const deleteLinkRouterPath = root + '/link/:id';
const scrapeLinkRouterPath = root + '/link/scrape';

const newTagRouterPath = root + '/tag/new';
const getTagRouterPath = root + '/tag/:id';
const updateTagRouterPath = root + '/tag/:id';
const deleteTagRouterPath = root + '/tag/:id';

export {
  loginRouterPath,
  logoutRouterPath,
  registerRouterPath,
  startResestPassword,
  endResestPassword,
  checkEmailExists,
  allUserRouterPath,
  getUserRouterPath,
  updateUserRouterPath,
  deleteUserRouterPath,
  newCollectionRouterPath,
  allUserCollectionsRouterPath,
  getCollectionRouterPath,
  getCollectionImageRouterPath,
  getCollectionImageTypeRouterPath,
  addTagToCollectionRouterPath,
  updateCollectionRouterPath,
  deleteCollectionRouterPath,
  newLinkRouterPath,
  allLinkRouterPath,
  getLinkRouterPath,
  updateLinkRouterPath,
  deleteLinkRouterPath,
  newTagRouterPath,
  getTagRouterPath,
  updateTagRouterPath,
  deleteTagRouterPath,
  verifyEmailAndCreateUser,
  scrapeLinkRouterPath,
};
