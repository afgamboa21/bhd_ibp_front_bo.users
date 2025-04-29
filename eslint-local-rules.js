const onlyPageComponentsInRoutes = require('./eslint-rules/only-page-components-in-routes');
const cleanInfrastructureImportsInApplication = require('./eslint-rules/clean-infrastructure-imports-in-application');
const cleanInfrastructureImportsInModels = require('./eslint-rules/clean-infrastructure-imports-in-models');
const cleanApplicationImportsInDomain = require('./eslint-rules/clean-application-imports-in-domain');

module.exports = {
  rules: {
    'only-page-components-in-routes': onlyPageComponentsInRoutes,
    'clean-infrastructure-imports-in-application':
      cleanInfrastructureImportsInApplication,
    'clean-infrastructure-imports-in-domain':
      cleanInfrastructureImportsInModels,
    'clean-application-imports-in-domain': cleanApplicationImportsInDomain,
  },
};

// 'clean-application-imports-in-domain': cleanApplicationImportsInDomain,
