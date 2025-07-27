// Mock React Native components and modules
jest.mock("react-native", () => {
    const RN = jest.requireActual("react-native");
    return {
        ...RN,
        // Mock specific React Native components if needed
        Animated: {
            ...RN.Animated,
            timing: jest.fn(),
            spring: jest.fn(),
        },
    };
});

// Mock expo modules
jest.mock("expo-haptics", () => ({
    impactAsync: jest.fn(),
    ImpactFeedbackStyle: {
        Light: "light",
        Medium: "medium",
        Heavy: "heavy",
        Rigid: "rigid",
        Soft: "soft",
    },
}));

// Global test timeout
jest.setTimeout(10000);
