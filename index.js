const fs = require('fs');

const inquirer = require('inquirer')


// Set of questions for the user using inquirer
inquirer.prompt([
    {
        type: 'input',
        message: 'What is your name?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'What is your location?',
        name: 'location',
    },
    {
        type: 'input',
        message: 'What is your LinkedIn URL?',
        name: 'linkedin',
    },
    {
        type: 'input',
        message: 'What is your Github URL?',
        name: 'github',
    }
]).then((response) => {


    // Declare the file name
    const filename = 'index.html'

    // Write to the file using the writeFile function, takes in the file name and what is being entered within the file.
    fs.writeFile(filename, 
        
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
            <title>Document</title>
        </head>
        <body>
            <h1 id='name' class='jumbotron text-center'>Hi my name is ${response.name}</h1>
            <p id='location' class='text-center'>${response.location}</p>
            <p class='text-center'><a id='linkedin' target='_blank'  href='${response.linkedin}'>${response.linkedin}</a></p>
            <br>
            <p class='text-center'><a id='github' target='_blank'  href='${response.github}'>${response.github}</a></p>
        </body>
        </html>`        
        ,
    (err) => err ? console.log(err) : console.log('done'))
})