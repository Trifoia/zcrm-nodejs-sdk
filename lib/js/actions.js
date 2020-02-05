const util = require('./util');

const actions = function actions() {
  return {
    convert: function(input) {
      return util.promiseResponse(util.constructRequestDetails(input, 'Leads/{id}/actions/convert', HTTP_METHODS.POST, false));// No I18N
    },
    addtags: function(input) {
      return util.promiseResponse(util.constructRequestDetails(input, input.module + '/{id}/actions/add_tags', HTTP_METHODS.POST, false));// No I18N
    }
  };
};

module.exports = actions;
