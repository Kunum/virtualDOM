import Component from "./src/component/index.js";
import createElement from "./src/create-element/index.js";

const virtualDOM = {
    Component: Component,
    createElement: createElement
};

export default virtualDOM
export {createElement, Component};