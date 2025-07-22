import type { LucideIcon } from "lucide-react";

type SuccessScreenProps = {
  Icon: LucideIcon;
  animation: string;
};

function SuccessScreen({ Icon, animation }: SuccessScreenProps) {
  return (
    <div className="w-screen h-screen fixed bg-black/70 flex justify-center items-center z-210">
      <Icon className={`w-1/2 text-green-300 ${animation} `} />
    </div>
  );
}

export default SuccessScreen;
