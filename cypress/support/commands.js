// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit' , (data = {
    firstName : 'Pedro',
    lastName  : 'Silva',
    email : 'pedro.silva@gmail.com',
    text : 'texto'}) => {

    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvxz', 10) 

        cy.get('input[name="firstName"]')
              .as('firstName')
              .should('be.visible')
              .type(data.firstName)
        cy.get('@firstName')
              .should('have.value', data.firstName)

        cy.get('input[name="lastName"]')
              .as('lastName')
              .should('be.visible')
              .type(data.lastName)
        cy.get('@lastName')
              .should('have.value', data.lastName)

        cy.get('#email').type(data.email)
        
        cy.get('#open-text-area').type(longText, {delay : 0 })

        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()


})