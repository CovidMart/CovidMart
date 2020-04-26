/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './UserHome'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    const singleUser = {
      firstName: 'Thanos',
      lastName: 'Senior',
      email: 'thanos@halfpop.org',
      phone: '666-666-6666',
      address: 'Desolate Orb'
    }
    userHome = shallow(<UserHome singleUser={singleUser} />)
  })

  it('renders user name in an h2', () => {
    expect(userHome.find('h2').text()).to.be.equal('Welcome, Thanos!')
  })
})
