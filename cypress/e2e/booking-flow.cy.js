const BOOKING_API = "http://127.0.0.1:8000/api/booking";

describe("Booking flow", () => {
  beforeEach(() => {
    cy.intercept("POST", BOOKING_API, {
      statusCode: 201,
      body: { id: 1, status: "pending" },
    }).as("createBooking");
    cy.stubEmailJs();
    cy.visit("/");
  });

  it("opens the booking dialog from the hero", () => {
    cy.openBookingDialog();
    cy.get('[data-testid="booking-dialog"]').should("be.visible");
    cy.get('[data-testid="booking-dialog"]').should(
      "contain.text",
      "Book Your Appointment",
    );
  });

  it("opens the booking dialog from the contact section", () => {
    cy.get('[data-testid="contact-book-button"]').click();
    cy.get('[data-testid="booking-dialog"]').should("be.visible");
  });

  it("opens the booking dialog from the services CTA", () => {
    cy.get('[data-testid="services-book-button"]').click();
    cy.get('[data-testid="booking-dialog"]').should("be.visible");
  });

  it("cancels without submitting", () => {
    cy.openBookingDialog();
    cy.get('[data-testid="booking-cancel"]').click();
    cy.get('[data-testid="booking-dialog"]').should("not.exist");
    cy.get("@createBooking.all").should("have.length", 0);
  });

  it("keeps submit disabled until every required field is set", () => {
    cy.openBookingDialog();
    cy.get('[data-testid="booking-submit"]').should("be.disabled");

    cy.get('[data-testid="booking-name"]').type("Jane Doe");
    cy.get('[data-testid="booking-email"]').type("jane@example.com");
    cy.get('[data-testid="booking-phone"]').type("5551234567");
    cy.get('[data-testid="booking-submit"]').should("be.disabled");

    cy.selectRadixOption("booking-service-trigger", "service-option-1");
    cy.selectRadixOption("booking-time-trigger", "time-option-1000AM");
    cy.get('[data-testid="booking-submit"]').should("be.disabled");

    cy.pickFutureDate();
    cy.get('[data-testid="booking-submit"]').should("not.be.disabled");
  });

  it("submits a valid booking and shows a success toast", () => {
    const target = new Date();
    target.setDate(target.getDate() + 3);
    const expectedDate = [
      target.getFullYear(),
      String(target.getMonth() + 1).padStart(2, "0"),
      String(target.getDate()).padStart(2, "0"),
    ].join("-");

    cy.openBookingDialog();
    cy.fillBookingForm();

    cy.get('[data-testid="booking-submit"]').click();

    cy.wait("@createBooking").then(({ request }) => {
      expect(request.body).to.include({
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "5551234567",
        service: "Swedish Massage",
        status: "pending",
        notes: "Please focus on my shoulders.",
      });
      expect(request.body.date).to.equal(expectedDate);
      expect(request.body.time).to.equal("10:00:00.000000");
      expect(request.body.schedule_at).to.equal(
        `${expectedDate}T10:00:00.000000`,
      );
    });

    cy.get('[data-testid="toast-title"]').should(
      "contain.text",
      "Thank you Jane Doe for booking!",
    );
    cy.get('[data-testid="booking-dialog"]').should("not.exist");
  });

  it("shows an error toast and keeps the dialog open when the API fails", () => {
    cy.intercept("POST", BOOKING_API, {
      statusCode: 500,
      body: { detail: "Internal Server Error" },
    }).as("createBookingError");

    cy.openBookingDialog();
    cy.fillBookingForm();
    cy.get('[data-testid="booking-submit"]').click();

    cy.wait("@createBookingError");
    cy.get('[data-testid="toast-title"]').should(
      "contain.text",
      "Failed to book appointment",
    );
    cy.get('[data-testid="booking-dialog"]').should("be.visible");
  });

  it("treats a network failure as a booking error", () => {
    cy.intercept("POST", BOOKING_API, { forceNetworkError: true }).as(
      "createBookingNetworkError",
    );

    cy.openBookingDialog();
    cy.fillBookingForm();
    cy.get('[data-testid="booking-submit"]').click();

    cy.wait("@createBookingNetworkError");
    cy.get('[data-testid="toast-title"]').should(
      "contain.text",
      "Failed to book appointment",
    );
    cy.get('[data-testid="booking-dialog"]').should("be.visible");
  });
});
