type FormattedMetric = {
  metrics: string;
  [key: string]: string | number;
};

type YearData = {
  value: string;
};

type MetricData = {
  [year: string]: YearData;
};

type FinancialData = {
  [metric: string]: MetricData;
};

// Function to format the data for the table
export const formatData = (data: FinancialData): FormattedMetric[] => {
  if (!data) {
    return [];
  }

  return Object.keys(data).map(metric => {
    const formattedMetric: FormattedMetric = {
      metrics: metric,
    };
    const yearData = data[metric];
    Object.keys(yearData).forEach(year => {
      formattedMetric[`FY’${year.slice(-2)}`] = yearData[year].value;
    });
    return formattedMetric;
  });
};

export const getYearRanges = () => {
  const currentYear = new Date().getFullYear();
  let startYear = currentYear - 1;
  let endYear = 2000;

  const yearRanges = [];

  for (let i = startYear; i >= endYear; i -= 5) {
    const rangeStart = Math.max(i - 4, endYear);
    yearRanges.push(
      `FY'${String(rangeStart).slice(-2)} - FY'${String(i).slice(-2)}`,
    );
  }

  return yearRanges;
};

export const getRangeYears = (yearRange: string): string[] => {
  const [start, end] = yearRange
    .split(' - ')
    .map(year => Number('20' + year.slice(-2)));
  const rangeYears = Array.from(
    { length: end - start + 1 },
    (_, i) => `FY’${String(start + i).slice(-2)}`,
  );

  return rangeYears;
};

export const convertFinancialYear = (financialYear: any, yearRange: any) => {
  // Extract the last two digits from the financial year string
  const lastTwoDigits = financialYear.slice(-2);

  // Extract the start year from the year range
  const startYear = yearRange.slice(3, 5);

  // Calculate the prefix based on the start year
  const prefix = '20';

  // Combine the prefix, start year and the last two digits to get the full year
  const fullYear =
    prefix +
    (parseInt(startYear, 10) + (parseInt(lastTwoDigits, 10) % 5))
      .toString()
      .padStart(2, '0');

  return fullYear;
};
