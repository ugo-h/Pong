import Screen from './Canvas'

test('context created successfully', () => {
    initHTML();
    const canv = document.getElementById('canv')
    
    // test
    expect(new Screen()).toBe(new Screen())
})

function initHTML() {
    const canvas = document.createElement('CANVAS')
    canvas.id="canv"
    document.body.append(canvas);
}
