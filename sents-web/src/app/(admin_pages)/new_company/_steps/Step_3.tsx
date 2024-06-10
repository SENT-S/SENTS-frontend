import { useState } from 'react';
import { IoImageOutline } from 'react-icons/io5';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { countryList } from '@/services/mockData/mock';
import NewsItem from '@/components/News/NewsItem';
import { RxPlus } from 'react-icons/rx';

const Step_3 = ({ setStep, step }: { setStep: any; step: number }) => {
  const [selectedSector, setSelectedSector] = useState('Uganda');
  const [showList, setShowList] = useState(false);

  const handleSelectSector = (value: string) => {
    setSelectedSector(value);
  };

  return (
    <>
      <h2 className="text-[#0D4222] text-center dark:text-[#E6F6F0]">
        Add News
      </h2>
      {!showList ? (
        <div className="space-y-8">
          <Select onValueChange={handleSelectSector}>
            <SelectTrigger className="rounded-2xl p-7 flex justify-between border border-[#8D9D93] dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
              <SelectValue
                placeholder="Select Category"
                className="text-center w-full"
              >
                {selectedSector}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
              {countryList.map((item, index) => (
                <SelectItem key={index} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Enter News URL"
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
          <Input
            placeholder="Enter News Source"
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
          <Input
            placeholder="Enter News Title"
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
          <Textarea
            placeholder="Enter News Summary"
            className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
          />
          <div className="flex items-center rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-4 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white">
            <input
              type="file"
              accept="image/*"
              id="fileUpload"
              className="w-full border-none"
              style={{ display: 'none' }}
            />
            <Label
              htmlFor="fileUpload"
              className="w-full flex justify-center items-center border-none cursor-pointer"
            >
              Upload Image
              <IoImageOutline className="ml-2" size={18} />
            </Label>
          </div>
          <Button
            onClick={() => setShowList(true)}
            className="bg-[#148C59] text-white w-full p-3 rounded-2xl flex justify-center items-center hover:bg-[#148C59d9]"
          >
            Submit
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col gap-4 w-full p-4">
            <NewsItem
              label="Top News"
              imgURL={'https://source.unsplash.com/random/finance'}
              newsItem={{
                id: '1',
                headline:
                  'Stocks close higher as investors shrug off inflation fears',
                short_description:
                  'Stocks close higher as investors shrug off inflation fears',
                news_source: 'News Source',
                url: 'News URL',
                image: 'https://source.unsplash.com/random/finance',
              }}
              windowWidth={0}
              showCheckbox={false}
              selectedIds={[]}
              onCheckboxChange={() => null}
            />
            <NewsItem
              label="Top News"
              imgURL={'https://source.unsplash.com/random/finance'}
              newsItem={{
                id: '1',
                headline:
                  'Stocks close higher as investors shrug off inflation fears',
                short_description:
                  'Stocks close higher as investors shrug off inflation fears',
                news_source: 'News Source',
                url: 'News URL',
                image: 'https://source.unsplash.com/random/finance',
              }}
              windowWidth={0}
              showCheckbox={false}
              selectedIds={[]}
              onCheckboxChange={() => null}
            />
          </div>
          <div className="flex justify-start p-4">
            <Button
              className="bg-[#E6EEEA] text-[#39463E] p-2 md:p-7 rounded-2xl dark:bg-[#39463E] dark:text-white hover:bg-[#e4f2eb] hover:text-[39463E]"
              onClick={() => setShowList(false)}
            >
              Add another news <RxPlus className="ml-3" size={18} />
            </Button>
          </div>
          <Button
            onClick={() => setStep(step + 1)}
            className="bg-[#148C59] text-white w-full p-3 rounded-2xl flex justify-center items-center hover:bg-[#148C59d9]"
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default Step_3;
