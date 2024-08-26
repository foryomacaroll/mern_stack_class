// read in Node.js
// ================
// *** All are async.

const fs = require("fs"); // fs ==> library

// fs.readFile("./docs/creativecoder.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data.toString());
//   }
// });

// // Write in Node.js
// // ================

// fs.writeFile("./docs/creativecoder.txt", "Hello World", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// // writeFile with new file-name will create new file
// // ==================================================
// // ** Cannot create new folder

// fs.writeFile("./docs/creativecoder123.txt", "Hello World", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// console.log("latest line of code");

// create file only if it is not exist
// ====================================

// if (!fs.existsSync("./docs/creativecoder123.txt")) {
//   fs.writeFile("./docs/creativecoder123.txt", "Hello World", (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//   });
//   // if file exist, file will be deleted.
// } else {
//   fs.unlink("./docs/creativecoder123.txt", (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("file deleted");
//   });
// }

// Create Folder
// ===============

// fs.mkdir("./new-folder", (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("folder created");
// });

// Delete Folder
// =============

// fs.rmdir("./new-folder", (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("folder deleted");
// });

// Delete if exist, Create if not exist
// ====================================

if (fs.existsSync("./new-folder")) {
  fs.rmdir("./new-folder", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("folder deleted");
  });
} else {
  fs.mkdir("./new-folder", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("folder created.");
  });
}
