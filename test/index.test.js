const Shard = require('../dist')

it('run each shard', () => {
  const theClass = new Shard()
  expect(theClass).toHaveBeenCalledTimes(1)
})
