import Event from '..'

export default class Ready extends Event {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    })
  }
  run(...args: any): void {
    console.log('Im Ready')
  }
}
