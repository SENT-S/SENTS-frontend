import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// Reusable TextAreaField Component
export const TextAreaField = ({
  value,
  placeholder,
  label,
  onChange,
}: {
  value: string;
  placeholder: string;
  label: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="space-y-3">
      <div className="text-left text-[#0D4222] dark:text-gray-300">
        <Label className="text-2xl font-medium">{label}</Label>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] h-[150px] max-h-[250px] dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
      />
    </div>
  );
};

// Reusable IconInputField Component
export const IconInputField = ({
  value,
  placeholder,
  label,
  type = 'text',
  icon,
  onChange,
}: {
  value: string;
  placeholder: string;
  label: string;
  type?: string;
  icon: React.ReactNode;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center text-[#0D4222] dark:text-gray-300">
        {icon}
        <Label className="text-2xl font-medium">{label}</Label>
      </div>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
      />
    </div>
  );
};

// Reusable InputField Component
export const InputField = ({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl bg-[#E6EEEA] border border-[#8D9D93] p-7 dark:bg-[#39463E] dark:border-[#39463E] dark:text-white"
    />
  );
};

// Reusable SelectField Component
export const SelectField = ({
  value,
  options,
  placeholder,
  onChange,
}: {
  value: string;
  options: { label: string; value: string }[];
  placeholder: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="rounded-2xl p-7 flex justify-between border border-[#8D9D93] dark:text-white bg-[#E6EEEA] dark:bg-[#39463E] dark:border-[#39463E]">
        <SelectValue placeholder={placeholder} className="text-center w-full">
          {value}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="z-50 bg-[#E6EEEA] rounded-xl">
        {options.map((item, index) => (
          <SelectItem key={index} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
