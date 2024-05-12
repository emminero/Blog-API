exports.paginateResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skipIndex = (page - 1) * limit;

    try {
      const results = {};
      results.results = await model.find()
        .limit(limit)
        .skip(skipIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};
