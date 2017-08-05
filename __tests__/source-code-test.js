import React from 'react';
import {shallow, mount} from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import ReactTestUtils from 'react-dom/test-utils';

import App from '../src/components/App'
import { NonSpan } from '../src/components/NonSpan'
import { Span } from '../src/components/Span'

describe('<App />', () => {
  it('should render', () => {
    const app = shallow(<App />)
    expect(app.hasClass('test'))
  })

  it('should render a form', () => {
    const app = mount(<App />)
    expect(app.find('form')).to.have.length(1)
  })

  it('should render two buttons', () => {
    const app = mount(<App />)
    expect(app.find('button')).to.have.length(2)
  })

  it('form should be a Component', () => {
    const app = shallow(<App />)
    const Form = app.find('Form')
    assert.equal(Form.length, 1)
  })
})

describe('<NonSpan />', () => {
  const wrapper = shallow(<NonSpan string="This test passes" />)

  it('should be a p tag', () => {
    let pTag = wrapper.find('p')
    assert.equal(pTag.length, 1)
  })

  it('should have text', () => {
    expect(wrapper.text()).to.equal('This test passes')
  })
})

describe('<Span />', () => {
  let onClick = sinon.spy()
  const wrapper = shallow(<Span onClick={onClick} content="this is another test" />)

  it('should be a span tag', () => {
    let span = wrapper.find('span')
    assert.equal(span.length, 1)
  })

  it('should have correct content', () => {
    expect(wrapper.text()).to.equal('this is another test')
  })

  it('can be clicked', () => {
    wrapper.find('span').simulate('click')
    expect(onClick).to.have.property('callCount', 1)
  })
})
