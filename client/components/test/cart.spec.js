/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Cart from '../Cart'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Cart', () => {
  let cart

  beforeEach(() => {
    const orderArray = [{id: 5, title: 'Pokemon Party', qty: 1, price: 2255}]

    const subtotal = item => item.qty * item.price

    cart = shallow(<Cart orderArray={orderArray} lineItemSubtotal={subtotal} />)
  })

  it('renders title of an order item in an h4', () => {
    expect(cart.find('h4').text()).to.be.equal('Pokemon Party')
  })
})
