export const asyncHandler = (funHandler) => {
  return (req, res, next) => {
    try {
      const response = funHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
