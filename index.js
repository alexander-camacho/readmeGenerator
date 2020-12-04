const fs = require('fs');

const inquirer = require('inquirer')


// Set of questions for the user using inquirer
inquirer.prompt([
    {
        type: 'input',
        message: 'What is your project title?',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Describe the project.',
        name: 'description',
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
    const filename = 'readmeGenerator.md'

    // Write to the file using the writeFile function, takes in the file name and what is being entered within the file.
    fs.writeFile(filename,

    `# ${response.title}


## Description
${response.description}

## Table of Contents
    *Lorem
        
    *Ipsum
           
    *Dolor
           
## Installation
${response.installation}

## Usage
${response.usage}

## License
${response.license}

## Contributing
${response.contributing}

## Tests
${response.tests}
           
## Questions
${response.questions}`
        ,
        (err) => err ? console.log(err) : console.log('done'))
})
