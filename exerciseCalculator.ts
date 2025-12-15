export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hours) => hours > 0).length;
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "excellent, target reached";
  } else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "bad";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (require.main === module) {
  if (process.argv.length > 2) {
  const args = process.argv.slice(2);
  const target = Number(args[0]);
  const dailyHours = args.slice(1).map((arg) => Number(arg));

  if (isNaN(target) || target <= 0) {
    console.error("Error: Target must be a positive number");
    process.exit(1);
  }

  if (dailyHours.some((hours) => isNaN(hours) || hours < 0)) {
    console.error("Error: All daily hours must be valid non-negative numbers");
    process.exit(1);
  }

  if (dailyHours.length === 0) {
    console.error("Error: Please provide at least one day of exercise hours");
    process.exit(1);
  }

    const result = calculateExercises(dailyHours, target);
    console.log(JSON.stringify(result, null, 2));
  } else {
    const result = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
    console.log(JSON.stringify(result, null, 2));
  }
}

