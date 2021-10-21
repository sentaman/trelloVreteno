/// <reference types="cypress" />

import data from '../fixtures/data.json'

describe('stabbing boards, list and tasks', () => {

    it('use stubbing boards response', () => {
        cy.intercept('/api/boards', { fixture: 'board.json' }).as('stubbedBoards');
        cy.visit('/');
    });

    it('check created boards title', () => {
        cy.visit('/')
        cy.get(data.boards.toDoBoard).should('contain', 'To Do')
        cy.get(data.boards.inProgressBoard).should('contain', 'In Progress')
        cy.get(data.boards.inQaBoard).should('contain', 'In QA')
        cy.get(data.boards.doneBoard).should('contain', 'Done')
    });

    it('assert starred board', () => {
        cy.get(data.starredBoard.boardTitle).should('contain', 'In Progress')
    })

    it('stubbing QA board response', () => {
        cy.intercept('/api/board/33267134028', { fixture : 'qaBoard1' }).as('stubbedQaBoard')
    })

    it('assert board, list and tasks', () => {
        cy.visit('/api/board/33267134028')
        cy.get(data.inQaBoard.boardTitle).should('have.value', 'In QA')
        cy.get(data.inQaBoard.listTitle).should('have.value', 'Top three list')
        cy.get(data.inQaBoard.firstTaskTitle).should('contain', 'Stubbing network responses')
        cy.get(data.inQaBoard.secondTaskTitle).should('contain', 'Changing parts of response data')
        cy.get(data.inQaBoard.thirdTaskTitle).should('contain', 'Intercepting')
    });
})