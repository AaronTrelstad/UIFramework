import { diff } from './diff.js'

export function render(vNode, container) {
    const dom = diff(null, vNode);
    container.appendChild(dom);
}
