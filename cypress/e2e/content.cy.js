describe("Page content", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders all six services", () => {
    cy.get('[data-testid="service-card"]').should("have.length", 6);
    cy.get("#services").should("contain.text", "Swedish Massage");
    cy.get("#services").should("contain.text", "Deep Tissue Massage");
    cy.get("#services").should("contain.text", "Hot Stone Massage");
    cy.get("#services").should("contain.text", "Couples Massage");
    cy.get("#services").should("contain.text", "Prenatal Massage");
    cy.get("#services").should("contain.text", "Aromatherapy Massage");
  });

  it("renders reviews and the rating summary", () => {
    cy.get('[data-testid="review-card"]').should("have.length", 5);
    cy.get("#reviews").should("contain.text", "What Our Clients Say");
    cy.get("#reviews").should("contain.text", "Based on 63 reviews");
  });

  it("renders the location, hours and footer details", () => {
    cy.get("#location").should("contain.text", "Visit Us");
    cy.get("#location").should("contain.text", "1111 Ocean Ave, Suite #101");
    cy.get("#location").should("contain.text", "Santa Monica");
    cy.get("#location").should("contain.text", "monday:");
    cy.get("#location").should("contain.text", "9:00 AM - 8:00 PM");
    cy.get("#location").should("contain.text", "sunday:");
    cy.get("#location").should("contain.text", "Closed");

    cy.get('[data-testid="footer"]').should("contain.text", "Quick Links");
    cy.get('[data-testid="footer"]').should("contain.text", "(111) 111-1111");
    cy.get('[data-testid="footer"]').should(
      "contain.text",
      "© 2026 Test. All rights reserved.",
    );
  });
});
