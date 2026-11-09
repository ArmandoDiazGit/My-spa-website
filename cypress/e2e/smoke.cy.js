describe("Smoke", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads the spa homepage with every section", () => {
    cy.get("h1").should("contain.text", "Pacific Serenity Massage & Wellness");
    cy.get("h1").should("be.visible");

    ["home", "about", "services", "reviews", "location", "contact"].forEach(
      (id) => {
        cy.get(`#${id}`).should("exist");
      },
    );

    cy.get('[data-testid="footer"]').should("be.visible");
    cy.get('[data-testid="nav-desktop"]').should("be.visible");
  });

  it("does not surface uncaught exceptions while rendering", () => {
    cy.on("uncaught:exception", (err) => {
      throw err;
    });

    cy.get("#services").scrollIntoView();
    cy.get("#contact").scrollIntoView();
    cy.get('[data-testid="contact-form"]').should("be.visible");
  });
});
