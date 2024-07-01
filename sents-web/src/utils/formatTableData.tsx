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
const formatData = (data: FinancialData): FormattedMetric[] => {
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

export default formatData;
