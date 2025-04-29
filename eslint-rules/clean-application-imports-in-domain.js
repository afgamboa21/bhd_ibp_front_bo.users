/**
 * @fileoverview No imports from application in domain layer
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow importing application modules in domain layer',
      category: 'Best Practices',
      recommended: false,
    },
    schema: [],
    messages: {
      noApplicationImport:
        'Importing application modules from domain is not allowed.',
    },
  },
  create(context) {
    const filename = context.getFilename();

    const isApplication =
      filename.includes('/models/') || filename.includes('\\models\\');

    return {
      ImportDeclaration(node) {
        if (!isApplication) return;

        const importPath = node.source.value;
        if (
          importPath.includes('/application/') ||
          importPath.includes('\\application\\') ||
          importPath.startsWith('application/')
        ) {
          context.report({
            node,
            messageId: 'noApplicationImport',
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
            (importPath.includes('/application/') ||
              importPath.includes('\\application\\') ||
              importPath.startsWith('application/'))
          ) {
            context.report({
              node,
              messageId: 'noApplicationImport',
            });
          }
        }
      },
    };
  },
};
