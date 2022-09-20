export function toTimestamp(dateString: string): number {
    if (!dateString) return 0;
    
    const [ d, m, y ] = dateString.split('/');
    return new Date(`${m}/${d}/${y}`).getTime();
}