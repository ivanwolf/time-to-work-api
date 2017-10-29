const paramParser = (params, fields) => {
  const result = {};
  Object.keys(params).forEach(key => {
    if (fields.includes(key)) {
      result[key] = params[key];
    }
  });
  return result;
};

module.exports = paramParser;
