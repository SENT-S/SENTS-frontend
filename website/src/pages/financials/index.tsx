import { useState, useEffect } from 'react';
import Layout from 'src/layouts/main';
import React from 'react';
import profile1 from '/images/profile.jpg';
import profile2 from '/images/profile1.jpg';
import profile3 from '/images/profile2.jpg';
import profile4 from '/images/profile3.jpg';
import Table from 'src/components/table/Table';
import { getFinancialData } from 'src/services/apis';
import { IoMdArrowDropdown } from 'react-icons/io';

interface ButtonProps {
  name: string;
  activeButton: string;
  handleButtonClick: (buttonName: string) => void;
}

interface FinancialData {
  financialData: { [key: string]: string }[] | null;
  loading: boolean;
}

/**
 * Button component
 * @param name
 * @param activeButton
 * @param handleButtonClick
 * @returns React.FC
 */
const Button: React.FC<ButtonProps> = ({
  name,
  activeButton,
  handleButtonClick,
}) => (
  <button
    onClick={() => handleButtonClick(name)}
    className={`px-8 py-2 rounded-full ${activeButton === name ? 'bg-blue-600 text-white ' : 'text-gray-400 hover:text-gray-500'}`}
  >
    {name}
  </button>
);

/**
 * Financials component
 * @param financialData
 * @param loading
 * @returns React.FC
 */
const Financials: React.FC<FinancialData> = ({ financialData, loading }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">
          Stanbic Uganda Holdings Limited
        </h3>
        <p className="text-sm text-gray-500">SBU</p>
        <div className="flex items-center space-x-2">
          <p className="text-lg font-bold">467.89</p>
          <small className="text-green-500">+1.66%</small>
        </div>
      </div>
      <small className="text-xs text-gray-400">
        Oct 25, 5:26:38PM UTC-4 . INDEXSP . Disclaimer
      </small>
      <h4 className="text-lg font-semibold">Annual Financials</h4>
      <Table data={financialData} isLoading={loading} />
    </div>
  );
};

const Overview = () => (
  <div>
    <h3 className="text-lg font-semibold">Overview</h3>
    <p className="text-sm text-gray-500">
      Stanbic Uganda Holdings Limited (SBU) is a financial services company in
      Uganda. The company is engaged in providing banking, insurance, wealth
      management, and investment services to a range of customers.
    </p>
  </div>
);

const About = () => (
  <div>
    <h3 className="text-lg font-semibold">About</h3>
    <p className="text-sm text-gray-500">
      Stanbic Uganda Holdings Limited (SBU) is a financial services company in
      Uganda. The company is engaged in providing banking, insurance, wealth
      management, and investment services to a range of customers.
    </p>
  </div>
);

const Index = () => {
  const [activeButton, setActiveButton] = useState('Overview');
  const [financialData, setFinancialData] = useState([]);
  const [showExperts, setShowExperts] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFinancialData(1).then(res => {
      setFinancialData(res.data[0].data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 768 ? setShowExperts(false) : setShowExperts(true);
    };

    // Call the handleResize function to set the initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const buttons = ['Overview', 'Financials', 'About'];
  const experts = [
    {
      name: 'Jane Doe',
      title: 'Senior Economic Analyst SENTS',
      image: profile1,
    },
    {
      name: 'Mary Immaculate',
      title: 'Analyst SENTS',
      image: profile4,
    },
    {
      name: 'Jack O’Connell',
      title: 'Economic Analyst SENTS',
      image: profile3,
    },
    {
      name: 'Mark Doe',
      title: 'Market Analyst SENTS',
      image: profile2,
    },
  ];

  const renderView = () => {
    switch (activeButton) {
      case 'Overview':
        return <Overview />;
      case 'Financials':
        return <Financials financialData={financialData} loading={loading} />;
      case 'About':
        return <About />;
      default:
        return <Overview />;
    }
  };

  return (
    <Layout>
      <div className="grid gap-y-2 md:gap-x-6 grid-cols-1 md:grid-cols-4 md:grid-flow-col">
        <div className="order-2 md:order-1 col-span-3 w-full space-y-4">
          <div className="bg-white shadow-md rounded-2xl px-6 py-4 flex justify-between items-center overflow-x-auto scrollbar-hide">
            {buttons.map(name => (
              <Button
                key={name}
                name={name}
                activeButton={activeButton}
                handleButtonClick={handleButtonClick}
              />
            ))}
          </div>
          <div className="bg-white shadow-md rounded-2xl p-6">
            {renderView()}
          </div>
        </div>

        {/* Experts */}
        <div className="order-1 md:order-2 col-span-1 w-full">
          <div className="bg-white space-y-3 shadow-md rounded-2xl px-6 py-4 overflow-auto">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Talk to our experts</h3>
              <button onClick={() => setShowExperts(!showExperts)}>
                <IoMdArrowDropdown />
              </button>
            </div>
            {showExperts && (
              <div className="space-y-4">
                {experts.map((expert, index) => (
                  <button
                    key={index}
                    onClick={() => {}}
                    className="flex items-center space-x-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                  >
                    <img
                      src={expert.image}
                      alt="profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-start">
                      <p className="font-semibold">{expert.name}</p>
                      <p className="text-xs text-gray-400">{expert.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
