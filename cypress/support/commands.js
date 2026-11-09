Cypress.Commands.add("openBookingDialog", () => {
  cy.get('[data-testid="hero-book-button"]').click();
  cy.get('[data-testid="booking-dialog"]').should("be.visible");
});

// Radix renders select options in a portal, so click the trigger then the
// option by its data-testid.
Cypress.Commands.add("selectRadixOption", (triggerTestId, optionTestId) => {
  cy.get(`[data-testid="${triggerTestId}"]`).click();
  // A plain click event commits the Radix option without a preceding
  // pointer-down. Cypress' pointer simulation can leave the option focused
  // but uncommitted, or commit it and pass through to the next element.
  cy.get(`[data-testid="${optionTestId}"]`).should("be.visible").trigger("click");
  cy.get(`[data-testid="${triggerTestId}"]`).should(
    "have.attr",
    "aria-expanded",
    "false",
  );
  cy.get("body").should("not.have.attr", "data-scroll-locked");
});

// Picks a day N days from now using DayPicker's data-day (ISO) attribute,
// which avoids depending on locale-specific aria-label formatting.
Cypress.Commands.add("pickFutureDate", (daysAhead = 3) => {
  const target = new Date();
  target.setDate(target.getDate() + daysAhead);

  const today = new Date();
  const crossesMonth =
    target.getMonth() !== today.getMonth() ||
    target.getFullYear() !== today.getFullYear();

  if (crossesMonth) {
    cy.get('button[aria-label="Go to the Next Month"]').click();
  }

  const iso = [
    target.getFullYear(),
    String(target.getMonth() + 1).padStart(2, "0"),
    String(target.getDate()).padStart(2, "0"),
  ].join("-");

  cy.get(`[data-day="${iso}"] button`).click();
  cy.get(`[data-day="${iso}"]`).should("have.attr", "data-selected", "true");
  cy.get('[data-testid="booking-selected-date"]').should("be.visible");
  return cy.wrap(target);
});

Cypress.Commands.add("stubEmailJs", (statusCode = 200) => {
  cy.intercept("POST", "https://api.emailjs.com/**", {
    statusCode,
    body: statusCode >= 400 ? "error" : "OK",
  }).as("emailJs");
});

Cypress.Commands.add("fillBookingForm", (overrides = {}) => {
  const data = {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "5551234567",
    notes: "Please focus on my shoulders.",
    ...overrides,
  };

  cy.pickFutureDate();
  cy.get('[data-testid="booking-name"]').clear().type(data.name);
  cy.get('[data-testid="booking-email"]').clear().type(data.email);
  cy.get('[data-testid="booking-phone"]').clear().type(data.phone);
  cy.selectRadixOption("booking-service-trigger", "service-option-1");
  cy.selectRadixOption("booking-time-trigger", "time-option-1000AM");

  if (data.notes) {
    cy.get('[data-testid="booking-notes"]').clear().type(data.notes);
  }

  return cy.wrap(data);
});
