export function mapToRange(value: number, range: readonly number[]) {
    const min = range[0];
    const max = range[range.length - 1];

    // Clamp value to range bounds
    if (value <= min) return min;
    if (value >= max) return max;

    // Check if the value is exactly in the range
    if (range.includes(value)) return value;

    // Check if range is continuous (step is consistent)
    const step = range[1] - range[0];
    const isContinuous = range.every(
        (val, i) => i === 0 || Math.abs(val - range[i - 1] - step) < 0.001,
    );

    if (isContinuous) {
        // For continuous ranges, find the nearest value
        let nearest = range[0];
        let minDistance = Math.abs(value - range[0]);

        for (let i = 1; i < range.length; i++) {
            const distance = Math.abs(value - range[i]);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = range[i];
            }
        }
        return nearest;
    } else {
        // For discontinuous ranges, find the nearest lower bound
        for (let i = range.length - 1; i >= 0; i--) {
            if (value >= range[i]) {
                return range[i];
            }
        }
        return range[0];
    }
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
