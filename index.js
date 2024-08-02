import Component from "./src/component";
import createElement from "./src/create-element";

const virtualDOM = {
    Component: Component,
    createElement: createElement
};

export default virtualDOM
export {createElement, Component};