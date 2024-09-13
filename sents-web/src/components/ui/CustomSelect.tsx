import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  multi?: boolean;
  onChange: (selected: Option | Option[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  defaultValue?: Option | Option[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  multi = false,
  onChange,
  placeholder = 'Select...',
  className = '',
  disabled = false,
  defaultValue,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [0, 4] } },
      {
        name: 'preventOverflow',
        options: {
          padding: 8,
          boundary: 'clippingParents', // Changed from 'viewport' to 'clippingParents'
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top-start', 'top-end', 'bottom-start', 'bottom-end'],
        },
      },
    ],
  });
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen && update) {
        setTimeout(() => {
          update();
          inputRef.current?.focus();
        }, 0);
      }
    }
  };

  const handleSelect = (option: Option) => {
    if (multi) {
      const newSelection = selectedOptions.some((item) => item.value === option.value)
        ? selectedOptions.filter((item) => item.value !== option.value)
        : [...selectedOptions, option];
      setSelectedOptions(newSelection);
      onChange(newSelection);
    } else {
      setSelectedOptions([option]);
      onChange(option);
      setIsOpen(false);
    }
  };

  const handleRemove = (option: Option, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelection = selectedOptions.filter((item) => item.value !== option.value);
    setSelectedOptions(newSelection);
    onChange(multi ? newSelection : newSelection[0] || null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleToggle();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        referenceElement &&
        !referenceElement.contains(event.target as Node) &&
        popperElement &&
        !popperElement.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [referenceElement, popperElement]);

  useEffect(() => {
    if (isOpen && update) {
      update();
    }
  }, [isOpen, update]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={setReferenceElement}
        className={`border border-green-800 rounded-xl p-2 cursor-pointer overflow-y-auto max-h-12 bg-white dark:bg-[#39463e] ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOptions.length === 0 ? (
          <div className="text-gray-400 text-left dark:text-white w-full">{placeholder}</div>
        ) : (
          <div className="flex flex-wrap gap-1">
            {selectedOptions.map((option) => (
              <span
                key={option.value}
                className="bg-gray-100 text-black dark:bg-gray-500 dark:text-white rounded-full px-2 py-1 text-sm"
              >
                {option.label}
                {multi && (
                  <button
                    className="ml-2 text-red-600 hover:text-red-800"
                    onClick={(e) => handleRemove(option, e)}
                    aria-label={`Remove ${option.label}`}
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className="bg-white w-auto border rounded-md shadow-lg mt-1 max-h-60 overflow-auto"
            role="listbox"
          >
            <input
              ref={inputRef}
              type="text"
              className="w-full p-2 border-b outline-none ring-0"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search options"
            />
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`p-2 cursor-pointer hover:bg-gray-100 dark:text-white dark:bg-gray-500 text-left ${
                  selectedOptions.some((item) => item.value === option.value)
                    ? 'bg-green-50 text-green-600 dark:bg-green-300 dark:text-green-800'
                    : ''
                }`}
                onClick={() => handleSelect(option)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSelect(option);
                  }
                }}
                role="option"
                aria-selected={selectedOptions.some((item) => item.value === option.value)}
                tabIndex={0}
              >
                {option.label}
              </div>
            ))}

            {filteredOptions.length === 0 && (
              <div className="p-2 text-gray-500">No options found</div>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default CustomSelect;
