import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggleable from './Toggleable'
import { expect } from 'vitest'

describe('<Toggleable />', () => {
  beforeEach(() => {
    render(
      <Toggleable buttonLabel='show...'>
        <div>toggleable content</div>
      </Toggleable>
    )
  })

  test('render its children', () => {
    screen.getByText('toggleable content')
  })

  test('at start the children are note displayed', () => {
    const element = screen.getByText('toggleable content')
    expect(element).not.toBeVisible()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const element = screen.getByText('toggleable content')
    expect(element).toBeVisible()
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const element = screen.getByText('toggleable content')
    expect(element).not.toBeVisible()
  })
})