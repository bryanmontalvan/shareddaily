// This file tests SearchForm.js
describe('Visit local test environment', () => {
    it('Visited local-host', () => {
        cy.visit('/');
    });
})

describe('Check search form', () => {
     it('Search for Audi vehicles', () => {
        cy.get('[placeholder="Search here"]').click();
        cy.get('[placeholder="Search here"]').type('Audi')
     });

     it('Check if an Audi vehicle is returned', () => {
        cy.contains('Make: Audi')
     })
})