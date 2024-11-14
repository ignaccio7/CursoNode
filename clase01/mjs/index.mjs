
/*

.js -> por defecto utiliza CommonJS
.mjs -> para utilizar ES Modules
.cjs -> para utilizar CommonJS

*/

import { sum, sub, mult } from "./operations.mjs";

console.log(sum(7,2));
console.log(sub(7,2));
console.log(mult(7,2));
