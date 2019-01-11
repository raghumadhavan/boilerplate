# CAST Frontend Boilerplate

This is temporal solution for creating FE project in with react + redux + react-router and more.

## Run the app for developing

- ``npm install``
- ``npm start``
- Open your favorite browser on ``http://localhost:8080/`` and start developing.

## Build the app

- ``npm run build``

    This will build the app bundles, copy assets and translations into a directory named ``dist``. It will contain the index.html
    file along with the minified files, just ready for production.

- ``npm run build:dev``

    This will do the same as ``npm run build`` and additionally it will add the source map in order to debug your code in
    pre-production environment.

## ES6 with Babel

Thanks to Babel you're able to use ES6 for your project. Babel is a transpiler that transforms ES6, and even ES7 features, to plain old ES5.

If you don't know ES6, here is a [good tutorial](https://babeljs.io/learn-es2015/) about it.

## ESLint

It's JavaScript linter in order to report patterns in your code, therefore, you should set it up on you editor to take advantage of it.

## Internationalization

This project provides a basic wrapper of [i18next](https://www.i18next.com/api.html) library, however it should be good enough
to cover the basic functionality regarding to preparing your project for supporting internationalization.
