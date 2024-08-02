/**
 * Altera as propriedades de um elemento de acordo com as mudanças na árvore.
 * @param {HTMLElement} node - O elemento a ser mudado.
 * @param {Record<string, any>} oldProps - As propriedades do elemento antigo.
 * @param {Record<string, any>} newProps - As propriedades do elemento novo.
*/

function patchProps(node, oldProps, newProps){
    // Remove props que não estão mais presentes no novo elemento
    for (const key in oldProps){
        if (!(key in newProps)){
            node.removeAttribute(key);
        }
    }

    // Adiciona novos props
    for (const key in newProps){
        if (oldProps[key] !== newProps[key]){
            node.setAttribute(key, newProps[key]);
        }
    }
}

export default patchProps;