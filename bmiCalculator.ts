export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

if (require.main === module) {
  if (process.argv.length > 2) {
    const height = Number(process.argv[2]);
    const weight = Number(process.argv[3]);

    if (isNaN(height) || isNaN(weight)) {
      console.error("Error: Please provide valid numbers for height (cm) and weight (kg)");
      process.exit(1);
    }

    if (height <= 0 || weight <= 0) {
      console.error("Error: Height and weight must be positive numbers");
      process.exit(1);
    }

    console.log(calculateBmi(height, weight));
  } else {
    console.log(calculateBmi(180, 74));
  }
}

