import { Check } from "lucide-react";

type ProgressBarProps = {
  steps: number;
  success: boolean;
};

function ProgressBar({ steps, success }: ProgressBarProps) {
  const stepStyles =
    "w-8 h-8 flex items-center justify-center rounded-full border-4 bg-white border-gray-300 text-gray-500";

  return (
    <div className="relative w-4/5 mx-auto mt-10">
      <div
        className={`absolute top-1/2 left-0 w-full h-2 ${steps > 2 ? "bg-green-300" : "bg-gray-300"} rounded-full transform -translate-y-1/2`}
      >
        {steps > 1 && (
          <div className="absolute top-1/2 left-0 w-1/2 h-2 bg-green-300 rounded-full transform -translate-y-1/2"></div>
        )}
      </div>
      <div className="relative flex justify-between items-center z-10">
        <div className={`${stepStyles} border-green-300 text-green-300`}>
          {steps > 1 ? <Check /> : 1}
        </div>
        <div
          className={`${stepStyles} ${steps > 1 ? "border-green-300 text-green-300" : ""}`}
        >
          {steps > 2 ? <Check /> : 2}
        </div>
        <div
          className={`${stepStyles} ${steps > 2 ? "border-green-300 text-green-300" : ""}`}
        >
          {success ? <Check /> : 3}
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
