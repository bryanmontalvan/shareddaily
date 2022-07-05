// This file tests the CarForm.js
describe('Visit local test environment', () => {
  it('Visited local-host', () => {
    cy.visit('/');
  });
})

describe('Form filing validity', () => {
    it("Can write on user input field", () => {
        cy.get('input[name="user"]').type('ImATestDontMindMe');
    });

    it("Can write on make input field", () => {
        cy.get('[placeholder="Honda"]').click();
        cy.contains('Audi').click();
    });

    it("Can write on model input field", () => {
        cy.get('input[name="model"]').type('A4');
    });

    it("Can write on year input field", () => {
        cy.get('input[name="year"]').type('2018');
    });

    it("Can add image-url to input field", () => {
        cy.get('input[name="image"]').type('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu9XTbKQKFkF6n3B8pA0fKoG0M-q2Nh1Jb5Q&usqp=CAU');
    });
})

describe('Submit check', () => {
    it("User can submit their car info", () => {
        cy.contains('Submit').pause().click();
        cy.contains('Thank you submitting!').should('be.visible');
    });
})

