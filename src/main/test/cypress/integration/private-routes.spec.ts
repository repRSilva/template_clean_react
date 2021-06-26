import * as Helper from '../utils/helpers'

describe('Private Routes', () => {
  it('Should logout if home has no token', () => {
    cy.visit('')
    Helper.testUrl('/login')
  })
})
