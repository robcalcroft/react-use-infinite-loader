import React from "react";

export default function useInfiniteLoader({
  initialPage = 0,
  loadMore,
  hasMore = false,
  initialise = true,
  rootMargin = "100px 0px 0px 0px",
  threshold = 0,
}) {
  if (typeof loadMore !== "function") {
    throw new TypeError(
      "useInfiniteLoader: loadMore must be a function and is required"
    );
  }
  const loaderRef = React.useRef(null);
  const page = React.useRef(initialPage);
  const observer = React.useRef(null);
  React.useEffect(() => {
    if (!observer.current && initialise === true) {
      observer.current = new IntersectionObserver(
        ([target]) => {
          if (target.intersectionRatio <= 0) {
            return;
          }
          if (hasMore === false) {
            return;
          }
          loadMore(page.current);
          page.current += 1;
        },
        { rootMargin, threshold }
      );
      if (loaderRef.current) {
        observer.current.observe(loaderRef.current);
      }
    }
    return () => {
      observer.current.disconnect();
      observer.current = undefined;
    };
  }, [hasMore, loadMore, page, initialise]);
  return { loaderRef, page: page.current };
}
