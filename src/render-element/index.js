import Component from "../component";

/**
 * Transforma um objeto virtual em elemento HTML.
 * @param {ComponenteVirtual} virtualNode - O objeto virtual a ser convertido.
 * @param {HTMLElement} [container] - Se informado, o elemento retornado será renderizado dentro deste container.
 * @returns {HTMLElement} O elemento convertido em HTML.
*/

function renderElement(virtualNode, container = undefined){
    if(virtualNode instanceof Component && container !== undefined){
        virtualNode.mount(container);
        return container;
    }

    if (typeof virtualNode === "string" || typeof virtualNode === "number"){
        return document.createTextNode(virtualNode.toString());
    }

    const element = document.createElement(virtualNode.type);

    for (const [key, value] of Object.entries(virtualNode.props)){
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
        element.appendChild(renderElement(child));
    });

    return element;
}

export default renderElement;