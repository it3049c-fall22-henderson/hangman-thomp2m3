const dirTree = require(`directory-tree`);
const _ = require(`lodash`);

describe(`folder structure`, function () {
  test(`root directory is properly setup`, () => {
    const rootTree = dirTree(`${__dirname}/..`);
    const nodes = rootTree.children.map((node) => node.name);

    expect(nodes).toContain(`resources`);
    expect(nodes).toContain(`index.html`);
    const expectedNodes = [
      `.babelrc`,
      `.eslintrc.json`,
      `.git`,
      `.gitignore`,
      `.scripts`,
      `.vscode`,
      `README.md`,
      `index.html`,
      `jest.config.js`,
      `node_modules`,
      `package-lock.json`,
      `package.json`,
      `.prettierignore`,
      `.prettierrc`,
      `resources`,
      `tests`,
    ];
    expect(nodes).toEqual(expect.arrayContaining(expectedNodes));
  });

  test(`resources directory is properly setup`, () => {
    const resourcesTree = dirTree(`${__dirname}/../resources`);
    const nodes = resourcesTree.children.map((node) => node.name);
    const expectedNodes = [ `vendor`, `js`, `css` ];
    expect(nodes).toEqual(expect.arrayContaining(expectedNodes));
  });

  test(`scripts directory includes one index.js files`, () => {
    const scriptsTree = dirTree(`${__dirname}/../resources/js`);
    const nodes = scriptsTree.children.map((node) => node.name);
    const expectedFiles = [ `index.js`, `Hangman.js` ];
    expect(nodes).toEqual(expect.arrayContaining(expectedFiles));
  });

  test(`styles directory includes one styles.css files`, () => {
    const stylesTree = dirTree(`${__dirname}/../resources/css`);
    const nodes = stylesTree.children.map((node) => node.name);

    expect(nodes).toContain(`styles.css`);
  });
});
