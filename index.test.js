const { helloName } = require('./index');

test('returns the name', () => {
    console.log = jest.fn();
    helloName('Test');
    expect(console.log.mock.calls[0][0]).toBe('Hello Test');
})

//repo