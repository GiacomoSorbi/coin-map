Use the [Live Demo](https://GiacomoSorbi.github.io/coin-map/).

## Technologies used

- `React` as UI library to create the base interface and data fetching
- `D3` as library to handle data visualisation, wrapped into a library app
- `Jest` for testing
- `create-react-app` to quickly set up basic boilerplate for the app
- `gh-pages` for deployment purposes
- `yarn pnp` for quicker and leaner management of the required dependencies

## Usage

The app automatically loads data from [the coin-map API](https://coinmap.org/api/) on load and on each change of the basic filters.

Categories are loaded when all the data are initially loaded and can be then used as extra filters.

## Available Scripts

In the project directory, you can run:

### `yarn`

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
