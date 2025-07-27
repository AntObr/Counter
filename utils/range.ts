const DEFAULT_RANGE = [0, 100] as const;

export function mapToRange(value: number, range?: [number, number]) {
    const [min, max] = range ?? DEFAULT_RANGE;
    return (value - min) / (max - min);
}

export function range(start: number, end: number, step: number) {
    const range = [];
    
    // Handle edge cases
    if (step === 0) return [];
    
    // If start equals end, return array with just that value
    if (start === end) return [start];
    
    // Handle invalid ranges
    if (step > 0 && start > end) return [];
    if (step < 0 && start < end) return [];
    
    // Calculate number of steps needed
    const steps = Math.floor((end - start) / step);
    
    // Generate the range (inclusive of end)
    for (let i = 0; i <= steps; i++) {
        range.push(start + i * step);
    }
    
    return range;
}