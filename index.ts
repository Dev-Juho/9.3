import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const bmi = calculateBmi(height, weight);
  res.json({
    weight,
    height,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (!Array.isArray(daily_exercises)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const dailyHours = daily_exercises.map((hours: unknown) => Number(hours));
  const targetNumber = Number(target);

  if (
    dailyHours.some((hours) => isNaN(hours) || hours < 0) ||
    isNaN(targetNumber) ||
    targetNumber <= 0
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const result = calculateExercises(dailyHours, targetNumber);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

