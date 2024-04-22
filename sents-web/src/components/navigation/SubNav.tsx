interface SubNavProps {
  links: string[];
  selectedLink: string;
  bgColor?: boolean;
  setSelectedLink: (link: string) => void;
}

const SubNav = ({
  links,
  selectedLink,
  setSelectedLink,
  bgColor = false,
}: SubNavProps) => {
  return (
    <div
      className={`flex justify-around mx-10 md:mx-0 items-center p-3 ${bgColor ? 'dark:bg-[#0E120F] bg-[#F8FAF9]' : 'dark:bg-[#39463E80] bg-white'}  rounded-2xl overflow-auto`}
    >
      {links.map(link => (
        <div
          key={link}
          className={`text-sm md:text-lg cursor-pointer px-2 md:px-6 py-2 rounded-2xl ${link === selectedLink ? `${bgColor ? 'bg-[#39463E80] text-[#39463E] dark:text-white' : 'bg-green-700'} text-white` : ''} text-[39463E]`}
          onClick={() => setSelectedLink(link)}
        >
          {link}
        </div>
      ))}
    </div>
  );
};

export default SubNav;
