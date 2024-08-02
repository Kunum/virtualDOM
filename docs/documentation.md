## Classes

<dl>
<dt><a href="#Component">Component</a></dt>
<dd><p>Representa um componente</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#createElement">createElement(type, props, children)</a> ⇒ <code><a href="#ComponenteVirtual">ComponenteVirtual</a></code></dt>
<dd><p>Cria um componente virtual.</p>
</dd>
<dt><a href="#isVirtualComponent">isVirtualComponent(obj)</a> ⇒ <code>boolean</code></dt>
<dd><p>Verifica se o objeto é um componente virtual.</p>
</dd>
<dt><a href="#diff">diff(oldVirtualElement, newVirtualElement, [childIndex])</a> ⇒ <code>function</code></dt>
<dd><p>Compara as mudanças entre duas árvores de componentes.</p>
</dd>
<dt><a href="#patchProps">patchProps(node, oldProps, newProps)</a></dt>
<dd><p>Altera as propriedades de um elemento de acordo com as mudanças na árvore.</p>
</dd>
<dt><a href="#renderElement">renderElement(virtualNode, [container])</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Transforma um objeto virtual em elemento HTML.</p>
</dd>
<dt><a href="#isArray">isArray(obj)</a> ⇒ <code>boolean</code></dt>
<dd><p>Verifica se um objeto é uma array.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ComponenteVirtual">ComponenteVirtual</a> : <code>Object</code></dt>
<dd><p>Representa um componente virtual.</p>
</dd>
</dl>

<a name="Component"></a>

## Component

Representa um componente

**Kind**: global class  

* [Component](#Component)
  * [new Component(props)](#new_Component_new)
  * [.props](#Component+props) : <code>Record.&lt;string, any&gt;</code>
  * [.state](#Component+state) : <code>Record.&lt;string, any&gt;</code>
  * [.subTree](#Component+subTree) : [<code>ComponenteVirtual</code>](#ComponenteVirtual) \| <code>string</code>
  * [.setState(newState)](#Component+setState)
  * [.update()](#Component+update)
  * [.mount(container)](#Component+mount)
  * [.render()](#Component+render)

<a name="new_Component_new"></a>

### new Component(props)

Cria um componente

| Param | Type                                    | Description                   |
| ----- | --------------------------------------- | ----------------------------- |
| props | <code>Record.&lt;string, any&gt;</code> | As propriedades do componente |

<a name="Component+props"></a>

### component.props : <code>Record.&lt;string, any&gt;</code>

As propriedades do componente

**Kind**: instance property of [<code>Component</code>](#Component)  
<a name="Component+state"></a>

### component.state : <code>Record.&lt;string, any&gt;</code>

O estado atual do objeto

**Kind**: instance property of [<code>Component</code>](#Component)  
<a name="Component+subTree"></a>

### component.subTree : [<code>ComponenteVirtual</code>](#ComponenteVirtual) \| <code>string</code>

Os filhos do componente

**Kind**: instance property of [<code>Component</code>](#Component)  
<a name="Component+setState"></a>

### component.setState(newState)

Atualiza o estado do componente e causa uma re-renderização

**Kind**: instance method of [<code>Component</code>](#Component)  

| Param    | Type                                    | Description                 |
| -------- | --------------------------------------- | --------------------------- |
| newState | <code>Record.&lt;string, any&gt;</code> | O novo estado do componente |

<a name="Component+update"></a>

### component.update()

Re-renderiza o componente

**Kind**: instance method of [<code>Component</code>](#Component)  
<a name="Component+mount"></a>

### component.mount(container)

Renderiza o componente dentro do container

**Kind**: instance method of [<code>Component</code>](#Component)  

| Param     | Type                     | Description                              |
| --------- | ------------------------ | ---------------------------------------- |
| container | <code>HTMLElement</code> | O container que será o pai do componente |

<a name="Component+render"></a>

### component.render()

Retorna a árvore de componentes filhos

**Kind**: instance method of [<code>Component</code>](#Component)  
<a name="createElement"></a>

## createElement(type, props, children) ⇒ [<code>ComponenteVirtual</code>](#ComponenteVirtual)

Cria um componente virtual.

**Kind**: global function  
**Returns**: [<code>ComponenteVirtual</code>](#ComponenteVirtual) - O componente em questão.  

| Param    | Type                                                               | Description                         |
| -------- | ------------------------------------------------------------------ | ----------------------------------- |
| type     | [<code>Component</code>](#Component) \| <code>string</code>        | O tipo do componente.               |
| props    | <code>Record.&lt;string, any&gt;</code>                            | As propriedades do elemento.        |
| children | [<code>Array.&lt;ComponenteVirtual&gt;</code>](#ComponenteVirtual) | A lista de filhos desse componente. |

<a name="isVirtualComponent"></a>

## isVirtualComponent(obj) ⇒ <code>boolean</code>

Verifica se o objeto é um componente virtual.

**Kind**: global function  
**Returns**: <code>boolean</code> - O resultado de obj ser um componente virtual.  

| Param | Type             | Description             |
| ----- | ---------------- | ----------------------- |
| obj   | <code>any</code> | O objeto a ser testado. |

<a name="diff"></a>

## diff(oldVirtualElement, newVirtualElement, [childIndex]) ⇒ <code>function</code>

Compara as mudanças entre duas árvores de componentes.

**Kind**: global function  
**Returns**: <code>function</code> - Uma função que executa as mudanças necessárias para a árvore antiga se tornar a árvore nova.  

| Param             | Type                                                 | Default        | Description                                                              |
| ----------------- | ---------------------------------------------------- | -------------- | ------------------------------------------------------------------------ |
| oldVirtualElement | [<code>ComponenteVirtual</code>](#ComponenteVirtual) |                | A árvore de componentes antiga.                                          |
| newVirtualElement | [<code>ComponenteVirtual</code>](#ComponenteVirtual) |                | A árvore de componentes nova.                                            |
| [childIndex]      | <code>number</code>                                  | <code>0</code> | O valor posição da árvore nova na lista de filhos de seu componente pai. |

<a name="patchProps"></a>

## patchProps(node, oldProps, newProps)

Altera as propriedades de um elemento de acordo com as mudanças na árvore.

**Kind**: global function  

| Param    | Type                                    | Description                         |
| -------- | --------------------------------------- | ----------------------------------- |
| node     | <code>HTMLElement</code>                | O elemento a ser mudado.            |
| oldProps | <code>Record.&lt;string, any&gt;</code> | As propriedades do elemento antigo. |
| newProps | <code>Record.&lt;string, any&gt;</code> | As propriedades do elemento novo.   |

<a name="renderElement"></a>

## renderElement(virtualNode, [container]) ⇒ <code>HTMLElement</code>

Transforma um objeto virtual em elemento HTML.

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - O elemento convertido em HTML.  

| Param       | Type                                                 | Description                                                                 |
| ----------- | ---------------------------------------------------- | --------------------------------------------------------------------------- |
| virtualNode | [<code>ComponenteVirtual</code>](#ComponenteVirtual) | O objeto virtual a ser convertido.                                          |
| [container] | <code>HTMLElement</code>                             | Se informado, o elemento retornado será renderizado dentro deste container. |

<a name="isArray"></a>

## isArray(obj) ⇒ <code>boolean</code>

Verifica se um objeto é uma array.

**Kind**: global function  
**Returns**: <code>boolean</code> - O resultado de obj ser uma array.  

| Param | Type             | Description             |
| ----- | ---------------- | ----------------------- |
| obj   | <code>any</code> | O objeto a ser testado. |

<a name="ComponenteVirtual"></a>

## ComponenteVirtual : <code>Object</code>

Representa um componente virtual.

**Kind**: global typedef  
**Properties**

| Name     | Type                                                               | Description                   |
| -------- | ------------------------------------------------------------------ | ----------------------------- |
| tipo     | <code>string</code>                                                | O tipo do componente          |
| props    | <code>Record.&lt;string, any&gt;</code>                            | As propriedades do componente |
| children | [<code>Array.&lt;ComponenteVirtual&gt;</code>](#ComponenteVirtual) | Os filhos do componente       |
