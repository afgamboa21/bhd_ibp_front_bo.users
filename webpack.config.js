const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'users',
  exposes: {
    './Component': './src/app/app.component.ts',
    './ApprovalSchemes': './src/app/features/approvalSchemes/ui/pages/approvalSchemes.page.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
