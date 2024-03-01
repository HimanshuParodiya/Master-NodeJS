const fs = require('fs')
const os = require('os')

//- Blocking/Sync
// console.log("start");
// const result = fs.readFileSync("./04_fileToRead.txt", 'utf-8')
// console.log(result);
// console.log("end");


//- Non Blocking

// console.log("start");

// fs.readFile('./04_fileToRead.txt', 'utf-8', (error, result) => {
//     console.log(result);
// })

// console.log("end");


//- os Module 

console.log(os.cpus().length); // i have only 4 core so i can go only upto 4 thread/worker













// Default thread size is 4
// can go max to 8 depends on machine to machine