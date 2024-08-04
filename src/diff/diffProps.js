import {isArray, parseClassNameList} from "../utils/index.js";

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
            const value = newProps[key];

            // Remove eventListeners
            if (key.startsWith("on") && typeof value === "function"){
                patches.push((node) => {
                    const eventName = key.slice(2).toLowerCase();
                    node.removeEventListener(eventName, value);
                });
                
                continue;
            }

            patches.push((node) => {
                node.removeAttribute(key);
            });
        }
    }

    // Adiciona novos props
    for (const key in newProps){
        if (oldProps[key] !== newProps[key]){
            let value = newProps[key];

            // Altera classes
            if (key === "className"){
                if (isArray(value)){
                    value = parseClassNameList(value);
                }

                patches.push((node) => {
                    node.className = value;
                });
                
                continue;
            }

            // Altera event listeners
            if (key.startsWith("on") && typeof value === "function"){
                patches.push((node) => {
                    const eventName = key.slice(2).toLowerCase();

                    // Remove o antigo, se existente
                    if (key in oldProps){
                        node.removeEventListener(eventName, oldProps[key]);
                    }

                    node.addEventListener(eventName, value);
                });
                
                continue;
            }
    
            // Altera o estilo
            if (key === "style" && typeof value === "object"){
                patches.push((node) => {
                    node.style = "";
                    Object.assign(node.style, value);
                });

                continue;
            }


            // Altera outros atributos
            patches.push((node) => {
                node.setAttribute(key, value);
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