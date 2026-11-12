import { mount } from "cypress/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppointmentDialog from "../../src/shared/booking/AppointmentDialog";
import Toaster from "../../src/shared/ui/Toaster";

const BOOKING_API = "http://127.0.0.1:8000/api/booking";

function mountDialog() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
    },
  });
  const onClose = cy.stub().as("onClose");

  mount(
    <QueryClientProvider client={queryClient}>
      <AppointmentDialog open onClose={onClose} />
      <Toaster />
    </QueryClientProvider>,
  );

  return onClose;
}

function fillForm() {
  cy.pickFutureDate();
  cy.get('[data-testid="booking-name"]').clear().type("Jane Doe");
  cy.get('[data-testid="booking-email"]').clear().type("jane@example.com");
  cy.get('[data-testid="booking-phone"]').clear().type("5551234567");
  cy.selectRadixOption("booking-service-trigger", "service-option-1");
  cy.selectRadixOption("booking-time-trigger", "time-option-1000AM");
}

describe("<AppointmentDialog />", () => {
  beforeEach(() => {
    cy.intercept("POST", BOOKING_API, {
      statusCode: 201,
      body: { id: 1, status: "pending" },
    }).as("createBooking");
    cy.stubEmailJs();
  });

  it("renders the booking form and keeps submit disabled until valid", () => {
    mountDialog();

    cy.get('[data-testid="booking-dialog"]').should("be.visible");
    cy.get('[data-testid="booking-submit"]').should("be.disabled");

    fillForm();

    cy.get('[data-testid="booking-submit"]').should("not.be.disabled");
  });

  it("calls onClose(false) when cancelled", () => {
    mountDialog();
    cy.get('[data-testid="booking-cancel"]').click();
    cy.get("@onClose").should("have.been.calledOnceWith", false);
  });

  it("posts the booking payload and shows a success toast", () => {
    mountDialog();
    fillForm();
    cy.get('[data-testid="booking-submit"]').click();

    cy.wait("@createBooking").then(({ request }) => {
      expect(request.body).to.include({
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "5551234567",
        service: "Swedish Massage",
        status: "pending",
      });
      expect(request.body.time).to.equal("10:00:00.000000");
    });

    cy.get('[data-testid="toast-title"]').should(
      "contain.text",
      "Thank you Jane Doe for booking!",
    );
    cy.get("@onClose").should("have.been.calledOnceWith", false);
  });

  it("shows an error toast and stays open when the request fails", () => {
    cy.intercept("POST", BOOKING_API, {
      statusCode: 500,
      body: { detail: "boom" },
    }).as("createBookingError");

    mountDialog();
    fillForm();
    cy.get('[data-testid="booking-submit"]').click();

    cy.wait("@createBookingError");
    cy.get('[data-testid="toast-title"]').should(
      "contain.text",
      "Failed to book appointment",
    );
    cy.get('[data-testid="booking-dialog"]').should("be.visible");
    cy.get("@onClose").should("not.have.been.called");
  });
});
