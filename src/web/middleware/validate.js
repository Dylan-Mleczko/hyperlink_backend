export const middlewareValidate = (validator) => (req, res, next) => {
  const { error } = validator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  return next();
};