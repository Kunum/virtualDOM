import diff from "../diff/index.js";
import renderElement from "../render-element/index.js";

/**
 * Representa um componente
 * @class
 */

class Component{

    /**
     * Cria um componente
     * @constructor 
     * @param {Record<string, any>} props - As propriedades do componente
     */
    constructor (props){
        /**
         * As propriedades do componente
         * @type {Record<string, any>}
         */
        this.props = props;
        
        /**
         * O estado atual do objeto
         * @type {Record<string, any>}
         */
        this.state = {};

        /**
         * Os filhos do componente
         * @type {ComponenteVirtual | string}
         */
        this.subTree = "";
    }

    /**
     * Atualiza o estado do componente e causa uma re-renderização
     * @param {Record<string, any>} newState - O novo estado do componente
     */
    setState(newState){
        this.state = { ...this.state, ...newState};

        this.update();
    }

    /**
     * Re-renderiza o componente
     */
    update(){
        const newSubTree = this.render();

        const patch = diff(this.subTree, newSubTree);

        this.parent = patch(this.parent.firstChild);
        this.subTree = newSubTree; 
    }

    /**
     * Renderiza o componente dentro do container
     * @param {HTMLElement} container - O container que será o pai do componente 
     */
    mount(container){
        this.parent = container;
        this.subTree = this.render();

        container.appendChild(renderElement(this.subTree));
    }

    /**
     * Retorna a árvore de componentes filhos
     */
    render(){
        throw new Error("Método render deve ser implementado na subclasse");
    } 
}

export default Component;