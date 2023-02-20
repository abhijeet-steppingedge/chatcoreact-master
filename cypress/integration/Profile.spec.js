context('Home Page', () => {
  beforeEach(() => {
    cy.login('sergio@ordering.co', 'test2020')
  })

  it('Check UI', () => {
    cy.wait(4000)
    cy.get('.sc-hRDjdK > svg > path').click()
    cy.get('.sc-epptyN > :nth-child(1)').click()
    cy.get('.user-image').should('exist')
    cy.get('.user-form').should('exist')
  })
})
