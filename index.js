const inquirer = require('inquirer')
const fs = require('fs')
const axios = require('axios')
const util = require('util')

 const writeFileAsync = util.promisify(fs.writeFile);
axios.get(`https://api.github.com/users/legacy812`)
  .then(({ data }) => {
    // console.log(data.login, data.id)
  })
  .catch(e => console.error(e))
function promptCreator() {
  return inquirer.prompt([
    {
      type: 'text',
      name: 'githubid',
      message: 'Github Login & ID:'
    },
    {
      type: 'input',
      name: 'ProjectTitle',
      message: 'Write the project title:'
    },
    {
      type: 'input',
      name: 'Description',
      message: 'Describe the project briefly:'
    },
    {
      type: 'input',
      name: 'TableofContents',
      message: 'Table of contents:'
    },
    {
      type: 'input',
      name: 'Installation',
      message: 'Required installtion:'
    },
    {
      type: 'input',
      name: 'Usage',
      message: 'Provide information about usage:'
    },
    {
      type: 'input',
      name: 'License',
      message: 'Any requirement of licenses?'
    },
    {
      type: 'input',
      name: 'Tests',
      message: 'What type of testing required?'
    }
  ])
}
function generateHTML(answers) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
      <style> 
      .h3{
        color: aquamarine;
        text-align: center;
      }
      #h3{
        font-style: italic;
        font-size: xx-large;
      }
      </style>
    </head>
    <body>
    
    <div class="row">
    <div class="col s12 m5">
      <div class="card-panel teal">
        <!-- Github login and id -->
        <!-- Project title -->
        
          <h3 id = "h3" class = "h3">ProjectTitle:${answers.ProjectTitle} </h3>
        
        <!-- Description -->
        
          <h3 class = "h3">Project Description:${answers.Description} </h3>
        
        <!-- Table of contents -->
        
          <h3 class = "h3">Table of Contents:${answers.TableofContents} </h3>
        
        <!-- Installation -->
        
          <h3 class = "h3">Installation:${answers.Installation} </h3>
        <!-- Usage -->
        
          <h3 class = "h3">Usage:${answers.Usage} </h3>
        
        <!-- License -->
        
          <h3 class = "h3">License:${answers.License} </h3>
         <!-- Tests -->
        
          <h3 class = "h3">Tests:${answers.Tests} </h3>
          
      </div>
    </div>
    </div>
    </body>
    </html>    
    
    `
}
promptCreator()
  .then(function (answers) {
    const html = generateHTML(answers)
    return writeFileAsync('index.html', html)
  })
  .then(function () {
    console.log('Successfully wrote to html file')
  })
  .catch(function (err) {
    console.log(err)
  })
//fs.writeFile('READMe.txt',answers)
//.catch (function(err) {
 //   console.error(e)
//})
