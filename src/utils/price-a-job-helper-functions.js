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
  const salariesSet = new Set(data.map((job) => job.salary));
  const salaries = [...salariesSet];

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

  const percentile75 = sortedSalaries[Math.floor(0.75 * sortedSalaries.length)];
  const percentile25 = sortedSalaries[Math.floor(0.25 * sortedSalaries.length)];

  const maxSalary = findMaxSalary(salaries, percentile75);
  const minSalary = findMinSalary(salaries, percentile25);

  // while (maxSalary <= 2 * percentile75 && maxSalary >= percentile75) {
  //   // Finding the next maximum value from existing salaries
  //   maxSalary = sortedSalaries.find((salary) => salary < maxSalary);
  // }

  // while (minSalary <= 2 * percentile25) {
  //   // Finding the next minimum value from existing salaries
  //   minSalary = salaries.find((salary) => salary > minSalary);
  // }

  return {
    averageSalary,
    medianSalary,
    minSalary,
    maxSalary,
    percentile25,
    percentile75,
  };
}

const findMaxSalary = (salaries, threshold) => {
  // Sort the salaries array from highest to lowest
  const sortedSalaries = salaries.sort((a, b) => b - a);

  let maxSalary = sortedSalaries[0]; // Initial max salary
  let index = 0;

  // Iterate through the sorted array to find the maximum value that satisfies the condition
  while (maxSalary >= threshold * 2 || maxSalary < threshold) {
    index++;

    // If index exceeds array length, break the loop as we have checked all salaries
    if (index >= sortedSalaries.length) {
      console.log("No salary satisfies the condition");
      return;
    }

    maxSalary = sortedSalaries[index];
  }

  return maxSalary;
};

const findMinSalary = (salaries, threshold) => {
  // Sort the salaries array from lowest to highest
  const sortedSalaries = salaries.sort((a, b) => a - b);

  let minSalary = sortedSalaries[0]; // Initial min salary
  let index = 0;

  // Iterate through the sorted array to find the minimum value that satisfies the condition
  while (minSalary < threshold / 2 || minSalary > threshold) {
    index++;

    // If index exceeds array length, break the loop as we have checked all salaries
    if (index >= sortedSalaries.length) {
      console.log("No salary satisfies the condition");
      return;
    }

    minSalary = sortedSalaries[index];
  }
  return minSalary;
};

export const goToExternalURL = (url, userType, accessBoolean) => {
  // Redirect the browser to the external URL
  const accessToken = localStorage.getItem("accessToken");

  window.location.href = url;
  window.location.href = `${url}?token=${accessToken}&user=${userType}&access=${accessBoolean}`;
};
