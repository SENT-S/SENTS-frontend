import React from 'react';

interface StepperProps {
  currentStep: number;
  steps: string[];
}

const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex justify-center items-center w-full py-5">
      <div className="flex w-full items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const stepClasses = isCompleted ? 'text-[#148C59]' : 'text-[#8D9D93]';
          const dotClasses = isCompleted ? 'bg-[#148C59]' : 'bg-[#8D9D93]';
          const lineClasses =
            index < currentStep - 1 ? 'bg-[#148C59]' : 'bg-[#8D9D93]';
          return (
            <React.Fragment key={index}>
              <div className={`flex flex-col w-full items-center relative`}>
                <div className={`text-sm font-normal mb-2 p-0 ${stepClasses}`}>
                  {step}
                </div>
                <div
                  className={`w-2.5 h-2.5 flex items-center justify-center rounded-full z-50 ${dotClasses}`}
                >
                  {isCompleted && (
                    <span className="text-sm font-semibold text-white"></span>
                  )}
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className={`absolute w-full h-[2px] top-[85%] left-[50%] ${lineClasses}`}
                  ></div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
