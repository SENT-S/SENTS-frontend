const countries = [
  { country: 'Uganda', currency: 'UGX' },
  { country: 'Kenya', currency: 'KES' },
  { country: 'Tanzania', currency: 'TZS' },
  { country: 'Rwanda', currency: 'RWF' },
  { country: 'Burundi', currency: 'BIF' },
  { country: 'South Sudan', currency: 'SSP' },
  { country: 'Somalia', currency: 'SOS' },
  { county: 'Democratic Republic of the Congo', currency: 'CDF' },
];

const getCurrencySymbol = (countryName: string) => {
  if (!countryName) {
    return;
  }

  const country = countries.find(c => c.country === countryName);
  return country ? country.currency : 'Country not found';
};

export default getCurrencySymbol;
