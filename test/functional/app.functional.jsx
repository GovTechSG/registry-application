/* eslint-disable no-console */

const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const config = require("../../webpack.config.js");
const path = require("path");
const Nightmare = require("nightmare");
require("nightmare-upload")(Nightmare);
const { expect } = require("chai");

let server;
let url;

describe("Functional tests", function funcTest() {
  // Required for async mocha tests, adjust as needed
  this.timeout(15000);

  before(() => {
    const compiler = webpack(config);
    server = new WebpackDevServer(
      compiler,
      Object.assign(config.devServer, {
        quiet: true,
        headers: { Connection: null } // Disable Connection: Keep-Alive
      })
    );
    server.listen(49999, "localhost");

    url = "http://localhost:49999";
    console.log(`Started webpack-dev-server at ${url}`);
  });

  after(() => {
    server.close(() => {
      process.exit();
    });
    console.log("Closed webpack-dev-server");
    setTimeout(() => {
      console.log("Forced abort after 5000ms");
      process.exit();
    }, 5000);
  });

  // Simplest example functional test
  it("starts a test webserver", done => {
    // Promises have to be wrapped in async as Babel mucks things up
    (async () => {
      const location = await Nightmare()
        .goto(url)
        .evaluate(() => document.location.href);

      expect(location).to.equal(`${url}/`);
      done();
    })();
  });

  it("clicks through to Pay", done => {
    // Promises have to be wrapped in async as Babel mucks things up
    (async () => {
      await Nightmare()
        .goto(url)
        .wait(".dropper")
        .upload("#upload-file", path.resolve("test/fixtures/pic.png"))
        .wait("button.next:enabled")
        .click("button.next")
        .wait("#register-owner")
        .type("#register-owner", "did:foo:bar")
        .wait("button.next:enabled")
        .click("button.next")
        .wait("h4")
        .end()
        .then(console.log)
        .catch(console.error);

      done();
    })();
  });
});
