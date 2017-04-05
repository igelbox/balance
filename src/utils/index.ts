export function cloneProps<T>(original: T): T {
    return Object.assign({}, original);
}
