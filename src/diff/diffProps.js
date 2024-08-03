/**
 * Altera as propriedades de um elemento de acordo com as mudanças na árvore.
 * @param {HTMLElement} node - O elemento a ser mudado.
 * @param {Record<string, any>} oldProps - As propriedades do elemento antigo.
 * @param {Record<string, any>} newProps - As propriedades do elemento novo.
*/

function diffProps(oldProps, newProps){
    const patches = [];
    
    // Remove props que não estão mais presentes no novo elemento
    for (const key in oldProps){
        if (!(key in newProps)){
            patches.push((node) => {
                node.removeAttribute(key);
            });
        }
    }
    // Adiciona novos props
    for (const key in newProps){
        if (oldProps[key] !== newProps[key]){
            patches.push((node) => {
                node.setAttribute(key, newProps[key]);
            });
        }
    }

    return (node) => {
        patches.forEach((patch) => {
            patch(node);
        });
    }
}

export default diffProps;