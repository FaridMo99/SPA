import { describe, test, expect, vi, beforeEach } from "vitest";
import passedTime from "../../src/utils/passedTime";

const MOCK_NOW = new Date("2025-10-27T10:00:00.000Z");

const getTimeAgo = (
  amount: number,
  unit: "second" | "minute" | "hour" | "day" | "month" | "year"
) => {
  const date = new Date(MOCK_NOW);
  const factor = {
    second: 1000,
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
    month: 1000 * 60 * 60 * 24 * 30, 
    year: 1000 * 60 * 60 * 24 * 365, 
  };
  date.setTime(date.getTime() - amount * factor[unit]);
  return date;
};

describe("passedTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_NOW);
    return () => vi.useRealTimers();
  });


  test("should correctly format time for seconds (less than 1 minute)", () => {
    const date59s = getTimeAgo(59, "second");
    expect(passedTime(date59s)).toBe("59 seconds ago");

    const date1s = getTimeAgo(1, "second");
    expect(passedTime(date1s)).toBe("1 second ago");

    const date0s = MOCK_NOW;
    expect(passedTime(date0s)).toBe("0 seconds ago");
  });

  test("should correctly format time for minutes (less than 1 hour)", () => {
    const date59m = getTimeAgo(59, "minute");
    date59m.setTime(date59m.getTime() - 59999);
    expect(passedTime(date59m)).toBe("59 mins ago");

    const date1m = getTimeAgo(1, "minute");
    expect(passedTime(date1m)).toBe("1 min ago");
  });

  test("should correctly format time for hours (less than 24 hours)", () => {
    const date23h = getTimeAgo(23, "hour");
    expect(passedTime(date23h)).toBe("23 hrs ago");

    const date1h = getTimeAgo(1, "hour");
    expect(passedTime(date1h)).toBe("1 hr ago");
  });

  test("should correctly format time for days (less than 30 days)", () => {
    const date29d = getTimeAgo(29, "day");
    expect(passedTime(date29d)).toBe("29 days ago");

    const date1d = getTimeAgo(1, "day");
    expect(passedTime(date1d)).toBe("1 day ago");
  });

  test("should correctly format time for months (less than 12 months)", () => {
    const date11mo = getTimeAgo(11, "month");
    expect(passedTime(date11mo)).toBe("11 mths ago");

    const date1mo = getTimeAgo(1, "month");
    expect(passedTime(date1mo)).toBe("1 mth ago");
  });

  test("should correctly format time for years (12 months or more)", () => {
    const date5y = getTimeAgo(5, "year");
    expect(passedTime(date5y)).toBe("5 yrs ago");

    const date1y = getTimeAgo(1, "year");
    expect(passedTime(date1y)).toBe("1 yr ago");
  });
});