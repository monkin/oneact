
export type Param<T> = (() => T) | T;
export namespace Param {
    export function value<T>(param: Param<T>): T {
        return param instanceof Function ? param() : param;
    }

    export function isValue<T>(v: Param<T>): v is T {
        return !(v instanceof Function);
    }
    export function isFunction<T>(v: Param<T>): v is () => T {
        return v instanceof Function;
    }

    export function update<T>(param: Param<T>, update: (v: T) => void): (() => void) | undefined {
        if (param instanceof Function) {
            update(param());
            return () => update(param());
        } else {
            update(param);
        }
    }

    let slice = Array.prototype.slice;
    export function map<R, T1>(p1: Param<T1>, transform: (p1: T1) => R): Param<R>;
    export function map<R, T1, T2>(p1: Param<T1>, p2: Param<T2>, transform: (p1: T1, p2: T2) => R): Param<R>;
    export function map<R, T1, T2, T3>(p1: Param<T1>, p2: Param<T2>, p3: Param<T3>, transform: (p1: T1, p2: T2, p3: T3) => R): Param<R>;
    export function map<R, T1, T2, T3, T4>(p1: Param<T1>, p2: Param<T2>, p3: Param<T3>, p4: Param<T4>, transform: (p1: T1, p2: T2, p3: T3, p4: T4) => R): Param<R>;
    export function map() {
        let l = arguments.length,
            params: Param<any>[] = slice.call(arguments, 0, l - 1),
            fn: Function = arguments[l -1];
        if (params.some(p => p instanceof Function)) {
            if (l === 2) {
                return () => fn(value(params[0]));
            } else if (l === 3) {
                return () => fn(value(params[0]), value(params[1]));
            } else if (l === 4) {
                return () => fn(value(params[0]), value(params[1]), value(params[2]));
            } else {
                return () => fn.apply(null, params.map(value));
            }
        } else {
            return fn.apply(null, params);
        }
    }
}