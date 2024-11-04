import { test, expect } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('My App works as expected', async () => {
  const user = userEvent.setup()
  const app = render(<App />)

  const textareaFrom = app.container.querySelector('textarea[placeholder="Type or paste the text here"]')
  expect(textareaFrom).toBeTruthy()

  await user.type(textareaFrom, 'Hola mundo')

  await waitFor(() => {
    const result = app.findByDisplayValue('Hello world', {}, { timeout: 3000 }); 
    expect(result).toBeTruthy(); 
  });

})