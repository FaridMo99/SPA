import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function UsersLoadingSkeleton() {
  return (
    <main className="flex flex-col">
      <section className="w-full h-[30vh] flex pl-10 items-center">
        <Skeleton circle width={120} height={120} />
        <Skeleton className="mt-[11vh]" width={100} height={20} />
      </section>
      <div className="w-full flex flex-col items-center mt-10">
        <Skeleton
          className="mb-8"
          borderRadius="1rem"
          width="80vw"
          height="20vh"
        />
        <Skeleton
          className="mb-8"
          borderRadius="1rem"
          width="80vw"
          height="20vh"
        />
      </div>
    </main>
  );
}

export default UsersLoadingSkeleton;
