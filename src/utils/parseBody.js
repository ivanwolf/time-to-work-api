const {MissingParameterError, ValidationError} = require('./errors');
/*
  params: {
    key: value,
    key2: value2,
  }

  fields: {
    key1: {
      required: true,
      nonEmpty: true,
    },
    key2: {},
  }
*/

const paramParser = (params, fields) => {
  // revisamos si el campo es requerido
  Object.keys(fields).forEach(key => {
    if (fields[key].required){
      if (!params.hasOwnProperty(key)) {
        throw new MissingParameterError(`Missing ${key} parameter`);
      }
    }
  });


  // Ahora filtramos los fields que queremos
  const result = {};
  Object.keys(params).forEach(param => {
    if (Object.keys(fields).includes(param)) {
      const field = fields[param];
      const value = params[param];
      if (field.notEmpty && value === '') {
        throw new ValidationError(`${param} can not be empty`);
      }
      result[param] = value;
    }

  });
  return result;
};


module.exports = paramParser;
