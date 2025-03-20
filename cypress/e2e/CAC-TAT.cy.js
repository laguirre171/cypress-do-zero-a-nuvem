describe('Central de Atendimento ao Cliente TAT', () => {
  
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {  
    
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {

        const data = {
          firstName : 'Luis',
          lastName : 'Aguirre',
          email : 'luis.aguirre@gmail.com',
          text : 'texto'
        }

        cy.fillMandatoryFieldsAndSubmit(data)
        cy.get('.success').should('be.visible')

  })

  it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>{

        cy.get('input[name="firstName"]').type('Luís')
        cy.get('input[name="lastName"]').type('Aguirre')
        cy.get('#email').type('luis.aguirregmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
  })

  it('tentando digitar valores não numericos no campo telefone', () => {

    cy.get('#phone').type('ABCDE').should('be.empty')

   
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

    cy.get('input[name="firstName"]')
        .as('firstName')
        .should('be.visible')
        .type('Luís')
    cy.get('@firstName')
        .should('have.value', 'Luís')

    cy.get('input[name="lastName"]')
        .as('lastName')
        .should('be.visible')
        .type('Aguirre')
    cy.get('@lastName')
        .should('have.value', 'Aguirre')


    cy.get('#open-text-area')
        .as('ajuda')
        .should('be.visible')
        .type('Teste 001')
    cy.get('@ajuda')
        .should('have.value', 'Teste 001')

    cy.get('input[type = "checkbox"][value="phone"]').check()

    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')


  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('input[name="firstName"]')
          .type('Luís')
          .should('have.value', 'Luís')
          .clear()
          .should('have.value','')

       cy.get('input[name="lastName"]')
          .type('Aguirre')
          .should('have.value', 'Aguirre')
          .clear()
          .should('have.value','')

    cy.get('#email')
          .type('luis.aguirre@gmail.com')
          .should('have.value', 'luis.aguirre@gmail.com')
          .clear()
          .should('have.value','')
    
    cy.get('#open-text-area')
          .type('Teste 001')
          .should('have.value', 'Teste 001')
          .clear()
          .should('have.value','')


  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
       
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto',() => {
    cy.get('#product')
          .select('YouTube')
          .should('have.value','youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor',() => {
    cy.get('#product')
          .select('mentoria')
          .should('have.value','mentoria')
  })

  it('seleciona um produto (Blog) por seu indice',() => {
    cy.get('#product')
          .select(1)
          .should('have.value','blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type = "radio"][value="feedback"]').check().should('have.value','feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type = "radio"]')
        .check()
        .should('be.checked')
  })

  it('marca ambos checkboxes, depois desmarca o último',() => {
    cy.get('input[type = "checkbox"')
        .check()
        .should('be.checked')     
        .last()
        .uncheck()
        .should('not.be.checked')


  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
        .as('fileToLoad')
        .selectFile('cypress/fixtures/example.json')
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json',{ action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')})
  })

  it('utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture("example.json").as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile',{ action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')})
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
    cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr', 'target')
        //.click()
  })

  


})