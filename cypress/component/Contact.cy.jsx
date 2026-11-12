import { mount } from "cypress/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Contact from "../../src/features/contact/Contact";
import Toaster from "../../src/shared/ui/Toaster";

function mountContact() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
    },
  });

  mount(
    <QueryClientProvider client={queryClient}>
      <Contact />
      <Toaster />
    </QueryClientProvider>,
  );
}

function fillContactForm() {
  cy.get('[data-testid="contact-name"]').type("Jane Doe");
  cy.get('[data-testid="contact-email"]').type("jane@example.com");
  cy.get('[data-testid="contact-phone"]').type("5551234567");
  cy.get('[data-testid="contact-time"]').type("Friday at 10 AM");
  cy.get('[data-testid="contact-notes"]').type("Looking forward to it.");
}

describe("<Contact />", () => {
  it("sends a message and shows a success toast", () => {
    cy.stubEmailJs();
    mountContact();
    fillContactForm();
    cy.get('[data-testid="contact-submit"]').click();

    cy.wait("@emailJs");
    cy.get('[data-testid="toast-title"]').should("contain.text", "Message sent!");
    cy.get('[data-testid="contact-name"]').should("have.value", "");
  });

  it("shows an error toast when sending fails", () => {
    cy.stubEmailJs(500);
    mountContact();
    fillContactForm();
    cy.get('[data-testid="contact-submit"]').click();

    cy.wait("@emailJs");
    cy.get('[data-testid="toast-title"]').should(
      "contain.text",
      "Failed to send message",
    );
  });

  it("opens the appointment dialog from the schedule button", () => {
    mountContact();
    cy.get('[data-testid="contact-book-button"]').click();
    cy.get('[data-testid="booking-dialog"]').should("be.visible");
  });
});
