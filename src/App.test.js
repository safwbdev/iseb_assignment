import data from "./data/data.json";
import { getHighestPaid, getLatestJoined } from "./components/Extra";

// TEST 1 - GET HIGHEST PAID EMPLOYEE
test("getHighestPaid", () => {
  const func = getHighestPaid(data);
  expect(func).toBe("Elsa Hill");
});

// TEST 2 - GET MOST RECENTLY JOINED EMPLOYEE
test("getLatestJoined", () => {
  const func = getLatestJoined(data);
  expect(func).toBe("Lina White");
});
