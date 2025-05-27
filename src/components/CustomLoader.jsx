import { Loader2 } from "lucide-react";
import React from "react";

function CustomLoader({styles}) {
  return <Loader2 size={60} className={`animate-spin text-green-300 ${styles}`} />;
}

export default CustomLoader;
