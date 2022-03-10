# Phaser 3 API Documentation

You can either:

1. Go to https://photonstorm.github.io/phaser3-docs/index.html to read the docs online. Use the drop-down menus at the top to navigate the name spaces, classes and Game Objects lists.

2. Or, you can checkout this repository and then read the documentation by pointing your browser to the local `docs/` folder. Again using the Classes and Namespaces links at the top of the page to navigate.

You can also generate new docs locally by running `npm run gen` and waiting (it may take up to an hour to generate the docs). See [Generating the Docs Locally](#generating-the-docs-locally) below for more instructions.

## TypeScript Definitions

The TypeScript defs have been moved to the [main Phaser repository](https://github.com/photonstorm/phaser/tree/master/types).

## Generating the Docs Locally

Phaser uses the popular [jsdoc](http://usejsdoc.org/), which means the documentation itself is written in the source code in the [Phaser](https://github.com/photonstorm/phaser/) repository. In order to regenerate the docs, you'll need to clone that repository and it must be in a folder named `phaser` in the parent directory.

Then run `npm install` to install dependencies, and finally run `npm run gen`. The generated docs will be in a new directory called `out/`. Double click on `out/index.html` to browse the generated documentation.