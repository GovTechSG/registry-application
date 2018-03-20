# registry-application

[![Build Status](https://travis-ci.org/GovTechSG/registry-application.svg?branch=master)](https://travis-ci.org/GovTechSG/registry-application)

This is a demo application for a despository/registrar that showcases the user flow for file registration.

It interacts with a HTTP gateway (see: registry-gateway in registry-contract), but can easily be converted to use Web3.

## Run and develop

```
yarn install
yarn d
yarn test
yarn lint
```

## Options

As URL params:

* `gateway=http://localhost:3000` URL override for HTTP gateway (default: `http://localhost:3000`)
* `?step=1` Loads the corresponding tab for development convenience

## Docker

```
docker-compose up
```

Builds the app and starts a server, exposing it at port 3001 to the host.
