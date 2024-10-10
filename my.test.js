import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { test, beforeAll, afterAll, afterEach } from 'vitest'

const server = setupServer()

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('repro', async () => {
	const url = 'https://example.com/'

	server.use(http.get(url, () => HttpResponse.json({ success: true })))

	console.log(server.listHandlers())

	await fetch(url)
})
