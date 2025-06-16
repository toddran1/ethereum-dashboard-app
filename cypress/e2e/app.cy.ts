describe("Ethereum Dashboard", () => {
  it("loads and shows connect button", () => {
    cy.visit("http://localhost:5173");
    cy.contains("Connect Wallet").should("be.visible");
  });
});
