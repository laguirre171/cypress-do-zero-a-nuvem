describe('Central de Atendimento ao Cliente TAT', () => {
  
  beforeEach(() => {
    cy.visit('https://marsair.recruiting.thoughtworks.net/LuisAguirre')
  })

  it('verifica o título da aplicação', () => {  
    
    cy.title().should('be.equal', 'Mars Airlines: Home')

  })


  it.only(' Basic Search flow No sits Available', () =>{

        cy.get('#departing').type('July')
        cy.get('#returning').select('December')
        cy.get('input[type="submit"]').click()
        cy.contains('Sorry, there are no more seats available.').should('be.visible')
  })

  it.only(' Basic Search flow sits Available', () =>{

        cy.get('#departing').select('July')
        cy.get('#returning').select('December (two years from now)')
        cy.get('input[type="submit"]').click()
        cy.contains('Call now on 0800 MARSAIR to book!').should('be.visible')
  })
})