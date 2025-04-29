module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        "Only components ending with 'Page' can be loaded with loadComponent in .routes.ts files.",
    },
    schema: [], // no options
  },
  create(context) {
    if (!context.getFilename().endsWith('.routes.ts')) {
      return {};
    }
    return {
      Property(node) {
        if (
          node.key &&
          node.key.name === 'loadComponent' &&
          node.value &&
          node.value.type === 'ArrowFunctionExpression'
        ) {
          // Buscar import().then((m) => m.AlgoPage)
          const body = node.value.body;
          if (
            body &&
            body.type === 'CallExpression' &&
            body.callee.type === 'Import' &&
            node.value.body.parent &&
            node.value.body.parent.type === 'MemberExpression'
          ) {
          }
          if (
            body &&
            body.type === 'CallExpression' &&
            body.callee.type === 'MemberExpression' &&
            body.callee.property.name === 'then'
          ) {
            const thenCallback = body.arguments[0];
            if (
              thenCallback &&
              (thenCallback.type === 'ArrowFunctionExpression' ||
                thenCallback.type === 'FunctionExpression') &&
              thenCallback.body.type === 'MemberExpression'
            ) {
              const exportedName = thenCallback.body.property.name;
              if (!exportedName.endsWith('Page')) {
                context.report({
                  node: thenCallback.body.property,
                  message: `Only components ending in 'Page' should be loaded in loadComponent (found: '${exportedName}')`,
                });
              }
            }
          }
        }
      },
    };
  },
};
