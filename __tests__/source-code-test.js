import React from 'react';
import {shallow, mount} from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import App from '../src/components/App';

// test('Should render input box on page', () => {
//   const app = shallow(<App />)
//
//   expect(app.hasClass('test'))
//
//
// })
describe('<App />', () => {
  it('should render', () => {
    const app = shallow(<App />)
    expect(app.hasClass('test'))
  })

  it('should render a form', () => {
    const app = shallow(<App />)
    expect(app.find('form')).to.have.length(1)
  })

  it('to have a button', () => {
    const app = shallow(<App />)
    expect(app.find('button')).to.have.length(1)
  })

  it('can submit', () => {
    const onButtonClick = sinon.spy()
    const app = mount(<App onButtonClick={onButtonClick} />)
    app.find('button').simulate('click')
    expect(onButtonClick).to.have.property('callCount', 1)
    // expect(onButtonClick).to.have.property('callCount', 1)
  })
})
