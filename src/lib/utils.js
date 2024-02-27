import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { staticData } from "./staticdata";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function timeFromStart(seconds) {
  // Define points and corresponding times in ascending order
  const points = [400, 350, 320, 300, 250, 200, 100, 100];
  const times = [0, 100, 300, 600, 900, 1200, 1800, Infinity];

  // Find the segment containing the input time
  for (let i = 0; i < times.length - 1; i++) {
    if (times[i] <= seconds && seconds < times[i + 1]) {
      const t1 = times[i];
      const t2 = times[i + 1];
      const p1 = points[i];
      const p2 = points[i + 1];

      // Calculate points using linear interpolation
      return p1 + ((p2 - p1) * (seconds - t1)) / (t2 - t1);
    }
  }

  // Return the last point for times exceeding the last segment
  return points[points.length - 1];
}

function timeFromLaunch(seconds) {
  // Define points and corresponding times in ascending order
  const points = [2000, 1500, 1000, 800, 600, 500, 400, 200, 100, 100];
  const times = [0, 300, 600, 900, 1800, 3600, 7200, 14400, 28800, Infinity];

  // Find the segment containing the input time
  for (let i = 0; i < times.length - 1; i++) {
    if (times[i] <= seconds && seconds < times[i + 1]) {
      const t1 = times[i];
      const t2 = times[i + 1];
      const p1 = points[i];
      const p2 = points[i + 1];

      // Calculate points using linear interpolation
      return p1 + ((p2 - p1) * (seconds - t1)) / (t2 - t1);
    }
  }

  // Return the last point for times exceeding the last segment
  return points[points.length - 1];
}

const axios = require("axios");

export async function getIndianEpochTimeFromWorldTimeAPI() {
  const response = await axios.get(
    "https://worldtimeapi.org/api/timezone/Asia/Kolkata"
  );
  const data = response.data;

  // Extract the Unix timestamp from the "unixtime" field
  const unixTime = data.unixtime;

  return unixTime;
}

getIndianEpochTimeFromWorldTimeAPI();

export async function levelScore(level, startTime, curscore) {
  const curTime = await getIndianEpochTimeFromWorldTimeAPI();
  const solveTime = curTime - startTime;
  const totalTime = curTime - staticData.startTimes[level];
  let score =
    (timeFromStart(solveTime) + timeFromLaunch(totalTime)) *
    staticData.levelWeightage[level];
  return curscore + score;
}

export function convertDotsToUnderscores(str) {
  return str.replace(/\./g, "_");
}
