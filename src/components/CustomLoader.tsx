import { Loader2 } from "lucide-react";

function CustomLoader({ styles = "" }: { styles?: string }) {
  return (
    <div className="w-full mt-6 flex items-center justify-center">
      <Loader2
        size={60}
        className={`animate-spin text-green-300 dark:text-dark-green ${styles}`}
      />
    </div>
  );
}

export default CustomLoader;
