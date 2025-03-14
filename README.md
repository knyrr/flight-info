# Flight Info

This simple app displays the next five departures from Norwegian airports using the AirLabs API. The list of airports is filtered to include only those with an IATA code, as these presumably have scheduled passenger flights.

Users can select an airport via an Angular Material autocomplete component or by clicking on pins displayed on a Google Maps interface. Upon selection, the map recenters on the chosen airport's location.

The design is minimalistic and fully responsive, automatically hiding the map interface on smaller screens to enhance the user experience.

To accommodate the limitations of the AirLabs API, the app includes an option to use mock data during development and disable live requests. This setting, along with the AirLabs API key, is managed through environment variables.

```
export const environment = {
  airLabsApiKey: API_KEY,
  isRequestLive: false,
};

```

## Screenshot

![Screenshot 2025-02-28 at 15-56-26 FlightInfo](https://github.com/user-attachments/assets/ea0f762e-a2b0-451d-bc57-4335e90ce7e5)



## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
