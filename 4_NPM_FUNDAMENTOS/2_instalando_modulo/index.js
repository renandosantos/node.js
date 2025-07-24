const _ = require('lodash')

const a = [1 , 3 , 4 , 6]
const b = [2 , 3 , 5 , 7]

const diff = _.difference(b, a)

console.log(diff)
