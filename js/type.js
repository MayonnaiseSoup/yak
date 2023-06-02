let paragraphs = 0


function wait(delay) {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    })
}



async function start() {
    await wait(3000)
    document.createElement("p").id = paragraphs
    document.getElementById(paragraphs).innerText = "Hello World!"
}

start()