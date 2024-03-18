export function formatColumnName(columnName) {
  // Replace spaces and slashes with underscores
  columnName = columnName.replace(/[\s/]+/g, "_").toLowerCase();

  // Remove any characters other than letters, numbers, and underscores
  columnName = columnName.replace(/[^a-zA-Z0-9_]/g, "");

  // Replace consecutive underscores with a single underscore
  columnName = columnName.replace(/_+/g, "_");
  return columnName;
}
export const CapitalizeFirstLetter = (data) => {
  // Split the string into words
  const words = data?.split(" ");
  // Capitalize the first letter of each word and make the rest lowercase
  const capitalizedWords = words?.map((word) => {
    if (word.charAt(0) === word.charAt(0).toUpperCase()) {
      // If the first letter is already capitalized, keep it as is
      return word;
    } else {
      // Otherwise, capitalize the first letter and make the rest lowercase
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });

  // Join the words back together with spaces
  return capitalizedWords?.join(" ");
};

export function calculateAverageSalary(data) {
  const salaries = data.map((job) => job.salary);
  const totalSalary = salaries.reduce((acc, val) => acc + val, 0);
  return (totalSalary / salaries.length)?.toFixed(2);
}

export function calculateMaxSalary(data) {
  const salaries = data.map((job) => job.salary);
  const maxSalary = Math.max(...salaries);
  return maxSalary.toFixed(2);
}
export const decimalFix = (number) => {
  const trimmed = Math.floor(number * 100) / 100;
  return trimmed;
};

export function calculateStatistics(data) {
  // Calculate average salary
  const salaries = data.map((job) => job.salary);

  const totalSalary = salaries.reduce((acc, val) => acc + val, 0);
  const averageSalary = totalSalary / salaries.length;

  // Calculate median salary
  const sortedSalaries = [...salaries].sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedSalaries.length / 2);
  const medianSalary =
    sortedSalaries.length % 2 === 0
      ? (sortedSalaries[middleIndex - 1] + sortedSalaries[middleIndex]) / 2
      : sortedSalaries[middleIndex];

  // Calculate minimum and maximum salary
  const minSalary = Math.min(...salaries);

  const maxSalary = Math.max(...salaries);

  // Calculate 10th and 90th percentile values
  const percentile25 = sortedSalaries[Math.floor(0.25 * sortedSalaries.length)];
  const percentile75 = sortedSalaries[Math.floor(0.75 * sortedSalaries.length)];

  return {
    averageSalary,
    medianSalary,
    minSalary,
    maxSalary,
    percentile25,
    percentile75,
  };
}
