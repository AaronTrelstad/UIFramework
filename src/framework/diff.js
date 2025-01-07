export function diff(oldNode, newNode) {
    if (!newNode) {
        return null;
    }

    if (typeof newNode === 'string' || typeof newNode === 'number') {
        if (!oldNode || oldNode !== newNode) {
            const textNode = document.createTextNode(newNode);
            return textNode;
        }
        return oldNode.dom;
    }

    if (!oldNode) {
        return createDomElement(newNode);
    }

    if (oldNode.type !== newNode.type) {
        return createDomElement(newNode);
    }

    if (oldNode.type === newNode.type) {
        const dom = oldNode.dom;
        updateAttributes(dom, oldNode.props, newNode.props);
        updateChildren(dom, oldNode.props.children, newNode.props.children);
        return dom;
    }
}

function createDomElement(vNode) {
    const dom = document.createElement(vNode.type);
    updateAttributes(dom, {}, vNode.props);

    if (Array.isArray(vNode.props.children)) {
        vNode.props.children.forEach(child => {
            const childDom = diff(null, child);
            if (childDom) dom.appendChild(childDom);
        });
    }

    vNode.dom = dom;
    return dom;
}

function updateAttributes(dom, oldProps, newProps) {
    Object.keys(newProps).forEach(key => {
        if (key === 'children') return;
        dom[key] = newProps[key];
    })
}

function updateChildren(dom, oldChildren, newChildren) {
    oldChildren.forEach((oldChild, index) => {
        const newChild = newChildren[index];
        if (oldChild && !newChild) {
            dom.removeChild(oldChild.dom);
        } else {
            const childDom = diff(oldChild, newChild); 
            if (childDom) dom.appendChild(childDom); 
        }
    });
} 
