export function toSeries<D extends object>(data: Array<D>, valueToMap: Array<keyof D>) {
    return data.map((item: D) => 
        valueToMap.map((key) => item[key]));
}