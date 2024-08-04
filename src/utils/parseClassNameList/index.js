/**
 * Converte uma lista de classes para uma string.
 * @param {string[]} list - A lista de classes.
 * @returns {string} Uma string compatível com element.className
*/

function parseClassNameList(list){
    let classNameString = "";

    list.forEach((c) => {
        classNameString += `${c} `;
    });

    return classNameString;
}

export default parseClassNameList;