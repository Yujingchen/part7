import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'

describe('<Togglabe />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show">
        <div className="testDiv" />
      </Togglable>)
  })
  test('render its child', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })
  test('at start the children is not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none;')
  })
  test('after clicking the button,children get displayed', () => {
    const button = component.getByText('show')
    fireEvent.click(button)
    const div = component.container.querySelector('.togglableContent')
    expect(div
    ).not.toHaveStyle('display: none;')
  })
  test('toggled content can be close', () => {
    const button = component.getByText('show')
    fireEvent.click(button)
    const closeButton = component.getByText('cancel')
    // fireEvent.click(button)
    fireEvent.click(closeButton)
    const div = component.container.querySelector('.togglableContent')
    expect(div
    ).toHaveStyle('display: none')
  })

})