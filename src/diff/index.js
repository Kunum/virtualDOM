import renderElement from "../render-element/index.js";
import diffProps from "./diffProps.js";

/**
 * Verifica se o objeto é um componente virtual.
 * @param {any} obj - O objeto a ser testado.
 * @returns {boolean} O resultado de obj ser um componente virtual.
*/

function isVirtualComponent(node){
    return typeof node === 'object' && 'type' in node;
}

/**
 * Cria um patch que renderiza e adiciona um componente virtual em um elemento pai.
 * @param {ComponenteVirtual} virtualChild - O objeto a ser renderizado e adicionado.
 * @returns {Function} A função patch.
*/

function insertChildPatch(virtualChild){
    return (parent) => {
        parent.appendChild(renderElement(virtualChild));
        return parent;
    }
}

/**
 * Compara as mudanças entre duas árvores de componentes.
 * @param {ComponenteVirtual} oldVirtualElement - A árvore de componentes antiga.
 * @param {ComponenteVirtual} newVirtualElement - A árvore de componentes nova.
 * @param {number} [childIndex = 0] - O valor posição da árvore nova na lista de filhos de seu componente pai.
 * @returns {Function} Uma função que executa as mudanças necessárias para a árvore antiga se tornar a árvore nova.
*/

function diff(oldVirtualElement, newVirtualElement, childIndex = 0){    
    // O elemento foi removido na nova árvore, remove-se de seu pai
    if (newVirtualElement === undefined){
        return (node) => {
            node.remove();
            return null;
        }
    }

    // Chegamos no fim da árvore, ou seja, um elemento de texto
    if (!isVirtualComponent(newVirtualElement)){
        // O texto foi alterado, atualiza o filho do seu pai
        if (oldVirtualElement !== newVirtualElement){
            return (node) => {
                node.parentNode.innerText = newVirtualElement.toString();
                return parent;
            }
        }

        // O texto não foi alterado, faz nada
        return (node) => {return node};
    }
    
    // O tipo do elemento foi alterado, substitui o filho do seu pai
    if (oldVirtualElement.type !== newVirtualElement.type){
        return (node) => {
            const parent = node.parentNode;
            parent.replaceChild(renderElement(newVirtualElement), parent.childNodes[childIndex]);
            return parent;
        }
    }

    // Nada encontrando, verificando filhos
    const childrenPatches = [];
    const newChildren = [];

    const patchProps = diffProps(oldVirtualElement.props, newVirtualElement.props);
    
    const maxChildren = Math.max(oldVirtualElement.children.length, newVirtualElement.children.length);
    
    for (let i = 0; i < oldVirtualElement.children.length; i++){
        childrenPatches.push(diff(oldVirtualElement.children[i], newVirtualElement.children[i], i));
    }

    for (let j = oldVirtualElement.children.length; j < maxChildren; j++){
        newChildren.push(insertChildPatch(newVirtualElement.children[j]));
    }

    return (node) => {
        const quantityOfChildren = node.childNodes.length;

        for (let childIndex = 0; childIndex < quantityOfChildren; childIndex++){
            const patchChild = childrenPatches[childIndex];
            patchChild(node.childNodes[childIndex]);
        }

        newChildren.forEach((addNewChild) => {
            addNewChild(node);
        });

        patchProps(node);

        return node.parentNode;
    }
}

export default diff;