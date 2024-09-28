import { useRouter } from 'next/navigation';
import { CiSearch } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Company } from '@/utils/types';

const SearchBox: React.FC<{
  searchData: Company[];
  query: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  results: Company[];
  setResults: React.Dispatch<React.SetStateAction<Company[]>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchRef: React.RefObject<HTMLDivElement>;
  loading: boolean;
}> = ({ searchData, query, handleSearch, results, setResults, setQuery, searchRef, loading }) => {
  const router = useRouter();

  return (
    <div className="relative w-full lg:w-1/3">
      {loading ? (
        <Skeleton className="w-full rounded-md p-5 relative bg-gray-200 dark:bg-[#0e120f]" />
      ) : (
        <>
          <div className="flex items-center h-[40px] text-gray-400 bg-gray-100 dark:bg-black rounded-lg overflow-hidden">
            <div className="ml-3">
              <CiSearch />
            </div>
            <input
              type="text"
              placeholder="Search for stocks & more"
              className="flex-grow max-md:text-sm px-2 w-full bg-transparent focus:outline-none"
              value={query}
              onChange={handleSearch}
            />
            {query && (
              <Button
                type="button"
                className="p-2 rounded-full dark:text-white bg-none"
                onClick={() => setQuery('')}
              >
                <IoMdClose size={20} />
              </Button>
            )}
          </div>
          {query && (
            <div
              className="absolute mt-2 w-full bg-white rounded-md shadow-lg max-h-60 z-50 overflow-auto dark:bg-[#39463E] dark:text-white"
              ref={searchRef}
            >
              {results.length > 0 ? (
                results.map((item) => (
                  <div
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      router.push(`/company/${item.id}`);
                      setQuery(item.company_name);
                      setResults([]);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        router.push(`/company/${item.id}`);
                        setQuery(item.company_name);
                        setResults([]);
                      }
                    }}
                    className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
                  >
                    {item.company_name}
                  </div>
                ))
              ) : (
                <div className="p-2 text-center text-gray-500 dark:text-gray-400">
                  No results found.
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchBox;
