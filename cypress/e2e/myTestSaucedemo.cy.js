describe('SauceDemo - QA Automation', { testIsolation: false }, () => {

    it('Visit the page', () => {

        cy.visit('https://www.saucedemo.com', { timeout: 120000 });
    })

    it('Login Incorrect User 1', () => {
        cy.intercept('POST','https://submit.backtrace.io/UNIVERSE/TOKEN/json').as('testAPI')
        cy.get('[placeholder="Username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_saoce')
        cy.get('#login-button').click()
        cy.wait('@testAPI').its('response.statusCode').should('eq',503)
    })

    it('Login ok User 1', () => {
        cy.get('[placeholder="Username"]').clear().type('standard_user')
        cy.get('[data-test="password"]').clear().type('secret_sauce')
        cy.get('#login-button').click()
    })

    it('Add product to cart User 1', () => {
        cy.url().should('include', '/inventory.html')
        cy.get('.inventory_item').first().find('button').click()
        cy.get('.inventory_item').eq(1).find('button').click()
        cy.get('.inventory_item').eq(2).find('button').click()
        cy.get('.shopping_cart_link').should('contain', '3')
    })

    it('Checkout User 1', () => {
        cy.checkout('User1', 'userLastName', '5000')
    })

    it('Validate chechout user 1', () => {
        cy.get('.complete-header').contains('Thank you for your order!').should('be.visible');
    });

    it('Logout User 1', () => {
        cy.get('[data-test="back-to-products"]').click()
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click()
    })

    it('Login User 2', () => {
        cy.get('[placeholder="Username"]').type('problem_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('#login-button').click()
    })

    it('Add product to cart User 2', () => {
        cy.url().should('include', '/inventory.html')
        cy.get('.inventory_item').first().find('button').click()
        cy.get('.inventory_item').eq(1).find('button').click()
        cy.get('.inventory_item').eq(2).find('button').click()
        cy.get('.shopping_cart_link').should('contain', '3')
    })

    it('Checkout User 2', () => {
        cy.checkout('User2', 'user2LastName', '5000')
    })

    it('Validate chechout user 2', () => {
        cy.get('.complete-header').contains('Thank you for your order!').should('be.visible');
    });

    it('Logout User 2', () => {
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click()
    })

})
