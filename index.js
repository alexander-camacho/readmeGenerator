const fs = require('fs');

const inquirer = require('inquirer')


// Set of questions for the user using inquirer
inquirer.prompt([
    {
        type: 'input',
        message: 'What is your github username?',
        name: 'github',
    },
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
    },
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
        message: 'What command should be run to install any depencies for this project?',
        name: 'installation',
        default: 'npm i',
    },
    {
        type: 'input',
        message: 'How is this project used?',
        name: 'usage',
    },
    {
        type: 'list',
        message: 'Which license does your project need?',
        name: 'license',
        choices: ["APACHE 2.0", "BSD 3", "GPL 3.0", "MIT", "None"]
    },
    {
        type: 'input',
        message: 'What should the user know about contributing to the project?',
        name: 'contributing',
    },
    {
        type: 'input',
        message: 'What command is needed to test this project?',
        name: 'test',
        default: 'npm test'
    },
]).then((response) => {


    // Declare the file name
    const filename = 'readmeGenerator.md'
    // Replace the space in any of the license names with the proper spacing format for a url in order to prevent the badge from breaking.
    const license = `${response.license}`.replace(" ", '%20')

    function renderLicenseTOC() {
        if(`${response.license}` !== 'None'){
            return `- [License](#license)`
        } else {
            return ''
        }
    }
    function renderLicenseSection() {
        if(`${response.license}` !== 'None'){
            return `## License
            This project is licensed under the ${response.license} license.`
        } else {
            return ''
        }
    }
    function renderLicenseBadge() {
        if(`${response.license}` !== 'None'){
            return `![License](https://img.shields.io/badge/license-${license}-lightblue.svg)`
        } else {
            return ''
        }
    }

    

    // Write to the file using the writeFile function, takes in the file name and what is being entered within the file.
    fs.writeFile(filename,

`# ${response.title}



## Description
${response.description}

## Table of Contents
- [Installation](#installation)        
- [Usage](#usage)           
${renderLicenseTOC()}
- [Contributing](#Contributing)
- [Tests](#Tests)
- [Questions](#Questions)
           
## Installation
Enter the following command into the command line: \`\`\`${response.installation}\`\`\`

## Usage
${response.usage}

${renderLicenseSection()}

## Contributing
${response.contributing}

## Test
Enter the following command into the command line: \`\`\`${response.test}\`\`\`
           
## Questions

View more of my work at the Github link below or contact me at the email below.
Github: https://github.com/${response.github}
Email: ${response.email}`
        ,
        (err) => err ? console.log(err) : console.log('done'))
})
