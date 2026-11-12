import { useState } from "react";
import { mount } from "cypress/react";
import Calendar from "../../src/shared/booking/Calendar";

function isoDate(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function futureTarget(daysAhead = 2) {
  const today = new Date();
  const target = new Date();
  target.setDate(target.getDate() + daysAhead);

  if (
    target.getMonth() !== today.getMonth() ||
    target.getFullYear() !== today.getFullYear()
  ) {
    cy.get('button[aria-label="Go to the Next Month"]').click();
  }

  return target;
}

function CalendarHarness() {
  const [selected, setSelected] = useState(null);
  return <Calendar selected={selected} onSelect={setSelected} />;
}

describe("<Calendar />", () => {
  it("calls onSelect with the clicked future day", () => {
    const onSelect = cy.stub().as("onSelect");
    mount(<Calendar selected={null} onSelect={onSelect} />);

    const target = futureTarget();

    cy.get(`[data-day="${isoDate(target)}"] button`).click();

    cy.get("@onSelect").should("have.been.calledOnce");
    cy.get("@onSelect")
      .its("firstCall.args.0")
      .should((date) => {
        expect(date).to.be.instanceOf(Date);
        expect(isoDate(date)).to.equal(isoDate(target));
      });
  });

  it("marks the clicked day as selected", () => {
    mount(<CalendarHarness />);

    const target = futureTarget();

    cy.get(`[data-day="${isoDate(target)}"] button`).click();

    cy.get(`[data-day="${isoDate(target)}"]`).should(
      "have.attr",
      "data-selected",
      "true",
    );
    cy.get(`[data-day="${isoDate(target)}"] button`)
      .invoke("attr", "class")
      .should("match", /selected/);
  });

  it("disables days before today", () => {
    mount(<Calendar selected={null} onSelect={cy.stub()} />);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    cy.get(`[data-day="${isoDate(yesterday)}"] button`).should("be.disabled");
  });
});
