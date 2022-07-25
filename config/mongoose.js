
const mongoose = require('mongoose');

main().catch(err => console.log(err));

const env = require('./environment')  
 
async function main() {
  await mongoose.connect('mongodb://localhost:27017/codial_development')
}

module.exports = main