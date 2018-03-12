# registry-application

[![Build Status](https://travis-ci.org/Neo-Type/registry-application.svg?branch=master)](https://travis-ci.org/Neo-Type/registry-application)

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

* `gateway=http://localhost:3000` URL override for HTTP gateway
* `?step=1` Loads the corresponding tab for convenience
