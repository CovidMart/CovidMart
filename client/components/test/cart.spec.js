/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CartList from '../CartList'
import {fetchCart} from '../../store/cart'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('CartList', () => {
  let cart

  beforeEach(() => {
    const activeCart = {
      id: 0,
      pricePaid: 2255,
      puzzles: [{id: 5, title: 'Pokemon Party', qty: 1, price: 2255}],
      userId: 0
    }

    cart = shallow(<CartList activeCart={activeCart} fetchCart={fetchCart} />)

    it('renders title of an order item in an h4', () => {
      expect(cart.find('h4').text()).to.be.equal('Pokemon Party')
    })
  })
})
