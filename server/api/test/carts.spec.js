/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const User = db.model('user')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart/:userId', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('doest GET /api/cart/:userId for wrong user', async () => {
      const res = await request(app)
        .get('/api/users/5')
        .expect(401)

      expect(res.text).to.be.equal("I can't let you do that, Dave.")
    })
  }) // end describe('/api/cart/:useerId')
}) // end describe('User routes')
