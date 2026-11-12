import { useState } from "react";
import { mount } from "cypress/react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../src/shared/ui/Select";

function SelectHarness() {
  const [value, setValue] = useState("");

  return (
    <div>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Pick an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alpha" data-testid="select-option-alpha">
            Alpha
          </SelectItem>
          <SelectItem value="beta" data-testid="select-option-beta">
            Beta
          </SelectItem>
        </SelectContent>
      </Select>
      <output data-testid="select-value">{value}</output>
    </div>
  );
}

describe("<Select />", () => {
  it("shows the placeholder before a selection", () => {
    mount(<SelectHarness />);
    cy.get('[data-testid="select-trigger"]').should(
      "contain.text",
      "Pick an option",
    );
  });

  it("opens and selects an option", () => {
    mount(<SelectHarness />);
    cy.get('[data-testid="select-trigger"]').click();
    cy.get('[data-testid="select-option-beta"]').should("be.visible").click();

    cy.get('[data-testid="select-value"]').should("have.text", "beta");
    cy.get('[data-testid="select-trigger"]').should("contain.text", "Beta");
  });
});
