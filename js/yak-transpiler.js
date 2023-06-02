const yakcode = document.getElementById("scripting-area")
const result = document.getElementById("result")

let variables = {

}


function run() {

    variables = {}

    const lines = yakcode.value.split('\n')
    let running = true

    result.querySelectorAll('p').forEach(function(paragraph) {
        paragraph.remove();
      });

    lines.forEach(function(line) {

        if (running) {
            if (line.substring(0, 4) === "say(") {

                if (line.substring(5, 7) === "${") {
                    console.log("${} found")
                } else {
                    const message = line.substring(5, line.length - 2);
                    const paragraph = document.createElement('p');
                    paragraph.innerHTML = message;
                    result.appendChild(paragraph);
                }
                
            }
            else if (line === "") {
                
            } 
            else if (line.substring(0, 3) === "var") {
                if (line.search("=") != -1) {
                    variables[line.substring(4, line.search("=") - 1)] = line.substring(line.search("=") + 3, line.length - 1)
                } else {
                    variables[line.substring(4)] = undefined
                }
            }
            else {
                console.log(variables.hasOwnProperty(line.substring(0, line.search("=") - 1)))
                if (variables.hasOwnProperty(line.substring(0, line.search("=") - 1)) == true) {
                    variables[line.substring(0, line.search("=") - 1)] = line.substring(line.search("=") + 3, line.length - 1)
                } else {
                    const errorMessage = "Error: " + line + " isn't a valid command.";
                    const errorParagraph = document.createElement('p');
                    errorParagraph.innerHTML = errorMessage;
                    result.appendChild(errorParagraph);
                    running = false;
                }
                
            }
        }


        
    })
        
    
}