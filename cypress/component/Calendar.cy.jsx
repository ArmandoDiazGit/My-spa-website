import { mount } from "cypress/react";
import Calendar from "../../src/components/Calendar/Calendar";

function isoDate(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

describe("<Calendar />", () => {
  it("calls onSelect with the clicked future day", () => {
    const onSelect = cy.stub().as("onSelect");
    mount(<Calendar selected={null} onSelect={onSelect} />);

    const target = new Date();
    target.setDate(target.getDate() + 2);

    cy.get(`[data-day="${isoDate(target)}"] button`).click();

    cy.get("@onSelect").should("have.been.calledOnce");
    cy.get("@onSelect")
      .its("firstCall.args.0")
      .should((date) => {
        expect(date).to.be.instanceOf(Date);
        expect(isoDate(date)).to.equal(isoDate(target));
      });
  });

  it("disables days before today", () => {
    mount(<Calendar selected={null} onSelect={cy.stub()} />);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    cy.get(`[data-day="${isoDate(yesterday)}"] button`).should("be.disabled");
  });
});
