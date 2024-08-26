// Stream ==> fill water pool with pipe
// ====================================

// Read Stream (R)
// =================
const fs = require("fs");

const readStream = fs.createReadStream("./docs/large.txt");

// readStream.on("data", function (data) {
//   //   console.log(data);
//   console.log(data.toString());
//   console.log("______Chunk_______");
// });

// Write Stream (U)
// =================

const writeStream = fs.createWriteStream("./docs/large-write.txt");

// readStream.on("data", function (data) {
//   writeStream.write(data.toString());
//   writeStream.write("______Chunk_______");
// });

readStream.pipe(writeStream);
