describe("Contact form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-testid="contact-form"]').scrollIntoView();
  });

  function fillContactForm() {
    cy.get('[data-testid="contact-name"]').type("Jane Doe");
    cy.get('[data-testid="contact-email"]').type("jane@example.com");
    cy.get('[data-testid="contact-phone"]').type("5551234567");
    cy.get('[data-testid="contact-time"]').type("Friday at 10 AM");
    cy.get('[data-testid="contact-notes"]').type("Looking forward to it.");
  }

  it("sends a message and shows the success toast", () => {
    cy.stubEmailJs();
    fillContactForm();
    cy.get('[data-testid="contact-submit"]').click();

    cy.wait("@emailJs");
    cy.get('[data-testid="toast-title"]').should("contain.text", "Message sent!");
    cy.get('[data-testid="contact-name"]').should("have.value", "");
    cy.get('[data-testid="contact-notes"]').should("have.value", "");
  });

  it("shows an error toast when EmailJS rejects the message", () => {
    cy.stubEmailJs(500);
    fillContactForm();
    cy.get('[data-testid="contact-submit"]').click();

    cy.wait("@emailJs");
    cy.get('[data-testid="toast-title"]').should(
      "contain.text",
      "Failed to send message",
    );
  });
});
