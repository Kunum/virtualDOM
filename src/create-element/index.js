import Component from "../component/index.js";

/**
 * Cria um componente virtual.
 * @param {Component | string} type - O tipo do componente.
 * @param {Record<string, any>} props - As propriedades do elemento.
 * @param {ComponenteVirtual[]} children - A lista de filhos desse componente.
 * @returns {ComponenteVirtual} O componente em questão.
*/

function createElement(type, props, children){
    if (typeof type === "function" && type.prototype instanceof Component){

        const component = new type({...props, children: children});
        
        const componentSubtree = component.render();
        componentSubtree.component = type;
        componentSubtree.originalProps = props; 

        return componentSubtree;
    }

    return {
        type,
        props: props || {},
        children: children || []
    };
}

export default createElement;