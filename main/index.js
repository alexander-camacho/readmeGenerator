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
    const filename = 'README.md'

    // Generates a table of contents link for the license if an option other than none is selected
    function renderLicenseTOC() {
        if (`${response.license}` !== 'None') {
            return `- [License](#license)`
        } else {
            return ''
        }
    }
    // Generates the license section in the readme if an option other than none is selected
    function renderLicenseSection() {
        if (`${response.license}` !== 'None') {
            return `## License
This project is licensed under the ${response.license} license.`
        } else {
            return ''
        }
    }
    // Generates a badge to display the license being used if an option other than none is selected
    function renderLicenseBadge() {


        // Replace the space in any of the license names with the proper spacing format for a url in order to prevent the badge from breaking.
        const license = `${response.license}`.replace(" ", '%20')
        if (`${response.license}` !== 'None') {
            return `![License](https://img.shields.io/badge/license-${license}-lightblue.svg)`
        } else {
            return ''
        }
    }



    // Write to the file using the writeFile function, takes in the file name and what is being entered within the file.
    fs.writeFile(filename,

        `# ${response.title}

${renderLicenseBadge()}

## Description
${response.description}

## Table of Contents
- [Installation](#installation)        
- [Usage](#usage)           
${renderLicenseTOC()}
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions?](#questions)
           
## Installation
Enter the following command into the command line to install dependencies: \`\`\`${response.installation}\`\`\`

## Usage
${response.usage}

${renderLicenseSection()}

## Contributing
${response.contributing}

## Tests
Enter the following command into the command line to test: \`\`\`${response.test}\`\`\`
           
## Questions?

View more of my work at the Github link below or contact me at the email below.

Github: [${response.github}](https://github.com/${response.github})

Email: ${response.email}`
        ,
        (err) => err ? console.log(err) : console.log('Readme has been generated.'))
})
