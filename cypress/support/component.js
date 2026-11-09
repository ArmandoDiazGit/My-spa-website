import "./commands";
import { resetToastStore } from "../../src/use-hooks/use-toast";

// Component tests mount into a fresh document per test, but stores that live at
// module scope (like the toast queue) survive between mounts. Reset them so a
// toast from one test cannot overlay the next test's component.
beforeEach(() => {
  resetToastStore();
  cy.window().then((win) => {
    win.localStorage.clear();
    win.sessionStorage.clear();
  });
});
