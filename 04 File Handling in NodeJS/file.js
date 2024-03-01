const fs = require('fs');

//- 1) create a file

// fs.watchFile and fs.writeFileSync // it is important to know the difference between them

// As of now lets continue

// Sync
// fs.writeFileSync('./test.txt', "This write file syncs the second argument")

// Async
// fs.writeFile('./test2.txt', "This write file Async the second argument", (error) => { })



//- 2) Read File
// Sync
// const data = fs.readFileSync('./04_fileToRead.txt', 'utf-8')
// console.log(data);

// Async
// fs.readFile('./04_fileToRead.txt', 'utf-8', (error, result) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(result);
//     }
// })

// if we are using Sync we can store the result in variable but not in case of Async
// And Async Required callback

//- 3) Add more data in same file
// Sync 
fs.appendFileSync("./04_fileToRead.txt", `${new Date().getDate().toString()}\n`)

// advance
// try {
//     fs.appendFileSync("./04_fileToRead.txt", new Date().getDate().toString());
//     console.log("Data appended successfully");
// } catch (error) {
//     console.error("Error appending data:", error.message);
// }


// we can also delete (unlink ) copy

fs.mkdirSync('./my-files')