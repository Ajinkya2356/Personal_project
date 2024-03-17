const AsyncHandler = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
export default AsyncHandler;
