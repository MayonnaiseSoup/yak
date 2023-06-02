// Set up some basic variables for future use
const yakcode = document.getElementById("scripting-area")
const result = document.getElementById("result")

// These are where variables from the yak code is held
let variables = {

}

// When the button is pressed, run this
function run() {

    // Reset variables from last run
    variables = {}

    // Identify what is a new line
    const lines = yakcode.value.split('\n')

    // Keeps track of if there has been an error yet
    let running = true

    // Delete everything from the last run
    result.querySelectorAll('p').forEach(function(paragraph) {
        paragraph.remove();
      });

    

    // Run this for each line
    lines.forEach(function(line) {


        // If there hasn't been an error yet, run this
        if (running) {

            // Is the line a say() command?
            if (line.substring(0, 4) === "say(") {

                // Is the user calling a variable?
                if (line.substring(5, 7) === "${") {

                    // Yes?
                    console.log("${} found")
                } else {

                    // Get the contents of say()
                    const message = line.substring(5, line.length - 2);
                    const paragraph = document.createElement('p');
                    paragraph.innerHTML = message;
                    result.appendChild(paragraph);
                }
                
            }

            // Is the line empty?
            else if (line === "") {
                // Do nothing
            } 

            //  Is the user declaring a new variable?
            else if (line.substring(0, 3) === "var") {

                // Is the user declaring the variable now?
                if (line.search("=") != -1) {
                    // Set the new variable
                    variables[line.substring(4, line.search("=") - 1)] = line.substring(line.search("=") + 3, line.length - 1)
                } else {
                    // Set the variable to undefined
                    variables[line.substring(4)] = undefined
                }
            }
            // Don't recognise the command? Run this.
            else {

                // This line is for debugging purposes
                console.log(variables.hasOwnProperty(line.substring(0, line.search("=") - 1)))

                // Check if their command is actually a variable, not a command.
                if (variables.hasOwnProperty(line.substring(0, line.search("=") - 1)) == true) {
                    // Set the variable to the new value
                    variables[line.substring(0, line.search("=") - 1)] = line.substring(line.search("=") + 3, line.length - 1)
                } else {
                    // Warn the user about the error
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