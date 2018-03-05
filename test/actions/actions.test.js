// import * as actions from "actions";
// import { ActionTypes } from "@src/types";

// import thunk from "redux-thunk";
// import configureMockStore from "redux-mock-store";

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

describe("actions", () => {
  describe("async", () => {
    let timeout;

    beforeEach(() => {
      timeout = window.setTimeout;
      window.setTimeout = f => f();
    });

    afterEach(() => {
      window.setTimeout = timeout;
    });
  });
});
