import inquirer from 'inquirer';
import qr from 'qr-image';
import { createWriteStream, writeFile } from 'fs';

inquirer
    .prompt([
        {
            name: 'input',
            message: "Please enter your text here: "
        }
    ])
    .then((answers) => {
        const msg = answers.input;
        var qr_svg = qr.image(msg);
        qr_svg.pipe(createWriteStream('message.png'));
        
        writeFile("message.txt", msg, 'utf8', (err) => {
            if (err) throw (err);
            console.log("The message has been saved to message.txt");
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
    });