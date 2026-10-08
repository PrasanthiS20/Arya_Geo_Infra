# AryaGeoInfra

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.0.

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

## Deploying With Coolify

### Dockerfile (Recommended)

The root `Dockerfile` builds the application with Node.js 22.22.3 and serves only the production browser files with Nginx on port 80. Nginx includes SPA fallback for client-side routes. This bypasses Nixpacks and its older Node.js package snapshot.

Commit and push `Dockerfile`, `.dockerignore`, and `nginx.conf`, then configure the existing Coolify application:

| Setting | Value |
| --- | --- |
| Build Pack | `Dockerfile` |
| Base Directory | `/` |
| Dockerfile Location | `/Dockerfile` |
| Ports Exposes | `80` |

Save and redeploy the latest commit. Install/build commands, Publish Directory, and the Nixpacks static-site option are not used for this build pack; the Dockerfile handles compilation and hosting. The existing `nixpacks.toml` and `NIXPACKS_NODE_VERSION` have no effect when using the Dockerfile build pack. If logs still use `ghcr.io/railwayapp/nixpacks`, Coolify has not switched to the Dockerfile build pack.

To test locally with Docker installed:

```bash
docker build -t arya-geo-infra .
docker run --rm -p 8080:80 arya-geo-infra
```

Open `http://localhost:8080/`.

### Nixpacks (Alternative)

Build from the repository root and serve the generated browser files as a static site. For the Nixpacks build pack, use these settings:

| Setting | Value |
| --- | --- |
| Build Pack | `Nixpacks` |
| Base Directory | `/` |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Is Static Site | Enabled |
| Publish Directory | `/dist/arya-geo-infra/browser` |
| Ports Exposes | `80` |

Angular 22 requires Node.js `^22.22.3 || ^24.15.0 || >=26.0.0`. Nixpacks selects only a major version, so `NIXPACKS_NODE_VERSION=22` can still supply an incompatible patch such as 22.11.0. The root `nixpacks.toml` installs Node.js 22.22.3 during setup and puts it first on `PATH` for subsequent phases. Keep `NIXPACKS_NODE_VERSION=22` to select the bootstrap runtime.

Commit and push `nixpacks.toml` with the application, then redeploy in Coolify. Remove any custom Nixpacks configuration file override so the root file is discovered. If the build still reports Node.js 22.11.0, verify that Coolify deployed the commit containing this file and did not override the setup phase or its paths. To diagnose the selected runtime, temporarily set the Build Command to `node --version && npm run build`.

Enable SPA fallback to `index.html` in the static web server if client-side routes are added.

Do not set the Base Directory to `/dist/arya-geo-infra`. That directory contains build artifacts, not the root `package.json` needed for Nixpacks application detection. If the deployment log shows `nixpacks detect .../dist/arya-geo-infra`, change the Base Directory to `/` and redeploy.

Do not use `npm start` for production hosting: it runs the Angular development server. The static-site deployment serves the production build instead.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

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
