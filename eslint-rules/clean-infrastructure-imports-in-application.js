/**
 * @fileoverview No imports from infrastructure in application layer
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow importing infrastructure modules in application layer',
      category: 'Best Practices',
      recommended: false,
    },
    schema: [],
    messages: {
      noInfraImport:
        'Importing infrastructure modules from application is not allowed.',
    },
  },
  create(context) {
    const filename = context.getFilename();

    const isApplication =
      filename.includes('/application/') ||
      filename.includes('\\application\\');

    return {
      ImportDeclaration(node) {
        if (!isApplication) return;

        const importPath = node.source.value;
        if (
          importPath.includes('/infrastructure/') ||
          importPath.includes('\\infrastructure\\') ||
          importPath.startsWith('infrastructure/')
        ) {
          context.report({
            node,
            messageId: 'noInfraImport',
          });
        }
      },
      CallExpression(node) {
        if (!isApplication) return;
        if (
          node.callee.name === 'require' &&
          node.arguments.length &&
          node.arguments[0].type === 'Literal'
        ) {
          const importPath = node.arguments[0].value;
          if (
            typeof importPath === 'string' &&
            (importPath.includes('/infrastructure/') ||
              importPath.includes('\\infrastructure\\') ||
              importPath.startsWith('infrastructure/'))
          ) {
            context.report({
              node,
              messageId: 'noInfraImport',
            });
          }
        }
      },
    };
  },
};
