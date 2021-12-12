(function() {
    let frame = document.createElement('iframe')
    frame.src = 'https://wv5kttn34jbz.statuspage.io/embed/frame'
    frame.style.position = 'fixed'
    frame.style.border = 'none'
    frame.style.boxShadow = '0 20px 32px -8px rgba(9,20,66,0.25)'
    frame.style.zIndex = '9999'
    frame.style.transition = 'left 1s ease, bottom 1s ease, right 1s ease'

    let mobile = screen.width < 450
    if (mobile) {
        frame.src += '?mobile=true'
        frame.style.height = '20vh'
        frame.style.width = '100vw'
        frame.style.left = '-9999px'
        frame.style.bottom = '-9999px'
        frame.style.transition = 'bottom 1s ease'
    } else {
        frame.style.height = '115px'
        frame.style.width = '320px'
        frame.style.left = '-9999px'
        frame.style.right = 'auto'
        frame.style.bottom = '60px'
    }

    document.body.appendChild(frame)

    let actions = {
        showFrame: function() {
            if (mobile) {
                frame.style.left = '0'
                frame.style.bottom = '0'
            } else {
                frame.style.left = '60px'
                frame.style.right = 'auto'
            }
        },
        dismissFrame: function() {
            frame.style.left = '-9999px'
        }
    }

    window.addEventListener('message', function(event) {
        if (event.data.action && Object.prototype.hasOwnProperty.call(actions, event.data.action)) {
            actions[event.data.action](event.data)
        }
    }, false)
    window.statusEmbedTest = actions.showFrame
})()