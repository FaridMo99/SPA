import { Loader2 } from "lucide-react";

function CustomLoader({ styles = "" }: { styles?: string }) {
  return (
    <div className="w-full mt-6 flex items-center justify-center">
      <Loader2 size={60} className={`animate-spin text-green-300 ${styles}`} />
    </div>
  );
}

export default CustomLoader;
