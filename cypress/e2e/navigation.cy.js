describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("scrolls to a section and marks the link active", () => {
    cy.get('[data-testid="nav-desktop"]').contains("a", "services").click();

    cy.get("#services").should(($section) => {
      const top = $section[0].getBoundingClientRect().top;
      expect(top).to.be.within(-120, 120);
    });

    cy.get('[data-testid="nav-desktop"] a[aria-current="page"]').should(
      "contain.text",
      "services",
    );
  });

  it("scrolls to the contact section from the desktop nav", () => {
    cy.get('[data-testid="nav-desktop"]').contains("a", "contact").click();

    cy.get("#contact").should(($section) => {
      const top = $section[0].getBoundingClientRect().top;
      expect(top).to.be.within(-120, 120);
    });
  });

  it("opens, navigates and closes the mobile menu", () => {
    cy.viewport(390, 844);
    cy.get('[data-testid="nav-mobile-toggle"]').should("be.visible").click();
    cy.get('[data-testid="nav-mobile-menu"]').should("be.visible");

    cy.get('[data-testid="nav-mobile-menu"]').contains("button", "Services").click();

    cy.get('[data-testid="nav-mobile-menu"]').should("not.exist");
    cy.get("#services").should(($section) => {
      const top = $section[0].getBoundingClientRect().top;
      expect(top).to.be.within(-120, 120);
    });
  });

  it("closes the mobile menu without navigating when toggled twice", () => {
    cy.viewport(390, 844);
    cy.get('[data-testid="nav-mobile-toggle"]').click();
    cy.get('[data-testid="nav-mobile-menu"]').should("be.visible");
    cy.get('[data-testid="nav-mobile-toggle"]').click();
    cy.get('[data-testid="nav-mobile-menu"]').should("not.exist");
  });
});
