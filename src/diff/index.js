import renderElement from "../render-element";
import patchProps from "./patchProps";

/**
 * Verifica se o objeto é um componente virtual.
 * @param {any} obj - O objeto a ser testado.
 * @returns {boolean} O resultado de obj ser um componente virtual.
*/

function isVirtualComponent(node){
    return typeof node === 'object' && 'type' in node;
}


/**
 * Compara as mudanças entre duas árvores de componentes.
 * @param {ComponenteVirtual} oldVirtualElement - A árvore de componentes antiga.
 * @param {ComponenteVirtual} newVirtualElement - A árvore de componentes nova.
 * @param {number} [childIndex = 0] - O valor posição da árvore nova na lista de filhos de seu componente pai.
 * @returns {Function} Uma função que executa as mudanças necessárias para a árvore antiga se tornar a árvore nova.
*/

function diff(oldVirtualElement, newVirtualElement, childIndex = 0){
    // Chegamos no fim da árvore, ou seja, um elemento de texto
    if (!isVirtualComponent(newVirtualElement)){
        // O texto foi alterado, atualiza o filho do seu pai
        if (oldVirtualElement !== newVirtualElement){
            return (parent) => {
                parent.innerText = newVirtualElement.toString();

                return parent;
            }
        }

        // O texto não foi alterado, faz nada
        return (parent) => {return parent};
    }
    
    // O elemento foi removido na nova árvore, remove-se de seu pai
    if (newVirtualElement == undefined){
        return (parent) => {
            parent.removeChild(parent.children[childIndex]);
            return parent;
        }
    }

    // O elemento foi adicionado na nova árvore, cria-se e adiciona-se em seu pai
    if (oldVirtualElement == undefined){
        return (parent) => {
            parent.appendChild(renderElement(newVirtualElement));
            return parent;
        }
    }

    // O tipo do elemento foi alterado, substitui o filho do seu pai
    if (oldVirtualElement.type !== newVirtualElement.type){
        return (parent) => {
            parent.removeChild(parent.children[childIndex]);
            parent.appendChild(renderElement(newVirtualElement));

            return parent;
        }
    }

    const childrenPatches = [];
    const maxChildren = Math.max(oldVirtualElement.children.length, newVirtualElement.children.length);

    for (let i = 0; i < maxChildren; i++){
        childrenPatches.push(diff(oldVirtualElement.children[i], newVirtualElement.children[i], i));
    }

    return (parent) => {
        for (const patch of childrenPatches){
            patch(parent.firstChild);
            patchProps(parent.firstChild, oldVirtualElement.props, newVirtualElement.props);
        }
        
        return parent
    }
}

export default diff;