/**
 * Verifica se um objeto é uma array.
 * @param {any} obj - O objeto a ser testado.
 * @returns {boolean} O resultado de obj ser uma array.
*/

function isArray(obj){
    return (typeof obj === "object" && !isNaN(obj.length));
}

export default isArray;