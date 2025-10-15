import { Loader2 } from "lucide-react";

function CustomLoader({
  styles = "",
  size = undefined,
}: {
  styles?: string;
  size?: undefined | number;
}) {
  return (
    <div className="w-full flex items-center justify-center">
      <Loader2
        size={size}
        className={`animate-spin text-green-300 dark:text-dark-green ${styles}`}
      />
    </div>
  );
}

export default CustomLoader;
