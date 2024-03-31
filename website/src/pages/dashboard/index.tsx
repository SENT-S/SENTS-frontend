import MainLayout from '../../layouts/main';
import { useState } from 'react';
import TableComponent from 'src/components/table';
import { List, tableData } from 'src/services/data/data';
import { GET_COUNTRY_FLAG } from 'src/services/urls';
import PlaceHolder from '/images/placeholder.png';

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState('Uganda');

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="text-3xl font-bold">Dashboard</div>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {List.map(country => (
            <div
              key={country.name}
              onClick={() => setSelectedCountry(country.name)}
              className={`flex flex-row justify-between items-center px-8 py-5 rounded-3xl w-full mx-auto cursor-pointer ${
                selectedCountry === country.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100 border border-gray-300'
              }`}
            >
              <div>
                <h2 className="font-normal text-2xl mb-2">{country.name}</h2>
                <p className="font-bold text-base">{country.count}</p>
              </div>
              <div className="">
                <img
                  className="h-14 w-14 rounded-full object-cover"
                  src={
                    `${GET_COUNTRY_FLAG}/${country.code.toLowerCase()}.svg` ||
                    PlaceHolder
                  }
                  alt="flag"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <TableComponent
          data={tableData}
          columns={[
            'Company Name',
            'Stock Symbol',
            'Sector/ Industry',
            'Stock Price',
            'GDP Change (%)',
          ]}
          showSearch={true}
          customRender={{
            'GDP Change (%)': (row, value) => (
              <span className="text-sm text-green-500">{row[value]}</span>
            ),
          }}
        />
      </div>
    </MainLayout>
  );
};

export default Index;
