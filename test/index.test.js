const Shard = require('../dist')
jest.mock('../dist')

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Shard.mockClear()
})

it('run each shard', () => {
  const theClass = new Shard()
  expect(theClass).toHaveBeenCalledTimes(1)
})
