import "@testing-library/jest-dom";

// Mock revalidatePath to avoid Next.js errors in tests
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

// Only reset database for integration tests
beforeEach(async () => {
  // Check if we're in an integration test by looking at the test file path
  const testPath = expect.getState().testPath;
  if (testPath && testPath.includes("tests/integration/")) {
    const { resetDatabase } = await import("./setup");
    await resetDatabase();
  }
});
