import Component from "../component/index.js";
import isArray from "../utils/isArray/index.js";

/**
 * Transforma um objeto virtual em elemento HTML.
 * @param {ComponenteVirtual} virtualNode - O objeto virtual a ser convertido.
 * @param {HTMLElement} [container] - Se informado, o elemento retornado será renderizado dentro deste container.
 * @returns {HTMLElement} O elemento convertido em HTML.
*/

function renderElement(virtualNode, container = undefined){
    if (typeof virtualNode === "string" || typeof virtualNode === "number"){
        return document.createTextNode(virtualNode.toString());
    }

    if(virtualNode instanceof Component && container !== undefined){
        virtualNode.mount(container);
        return container;
    }

    const element = document.createElement(virtualNode.type);

    for (const [key, value] of Object.entries(virtualNode.props)){
        if (key === "className"){
            if (isArray(value)){
                value.forEach((c) => {
                    element.classList.add(c);
                });
                continue;
            }

            element.classList.add(value);
            continue;
        }

        if (key.startsWith("on") && typeof value === "function"){
            const eventName = key.slice(2).toLowerCase();
            element.addEventListener(eventName, value);
            continue;
        }

        if (key === "style" && typeof value === "object"){
            Object.assign(element.style, value);
            continue;
        }

        element.setAttribute(key, value);
    }

    virtualNode.children.forEach((child) => {
        if (child.component){
            new child.component({...child.originalProps, children: child.children}).mount(element);
            return;
        }

        element.appendChild(renderElement(child, element));
    });

    return element;
}

export default renderElement;