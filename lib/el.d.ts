export declare type Attributes = {
    [key: string]: (string | (() => string | false) | (() => string) | ((e: Event) => void));
};
export declare type Children = (El | string | (() => string))[];
export declare type Parameter = string | Attributes | Children;
export interface El {
    readonly node: Node | [Node, Node];
    update(this: El): void;
    dispose(this: El): void;
}
export declare function el(...params: Parameter[]): {
    node: Node;
    update(): void;
};
export declare function svg(...params: Parameter[]): {
    node: Node;
    update(): void;
};
export declare function nodes(el: El): Node[];
export declare function append(node: Node, el: El): Node;
export declare function preppend(node: Node, el: El): Node;
export declare function insertBefore(node: Node, el: El): Node | undefined;
export declare function insertAfter(node: Node, el: El): Node;
export declare function detach(el: El): El;
export declare function remove(el: El): void;
export declare function firstNode(el: El): Node;
export declare function lastNode(el: El): Node;