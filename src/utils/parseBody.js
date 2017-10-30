const {findIndex} = require('lodash');
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
  console.log(params, fields);
  Object.keys(fields).forEach(key => {
    if (fields[key].required){
      if (!params.hasOwnProperty(key)) {
        console.log('Entramos');
        throw new MissingParameterError(key);
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
        throw new ValidationError(param);
      }
      result[param] = value;
    }

  });
  console.log(result);
  return result;
};


module.exports = paramParser;
