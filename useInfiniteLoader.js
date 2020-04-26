import React from "react";

export default function useInfiniteLoader({
  startFromPage = 0,
  loadMore,
  canLoadMore = false,
  initialise = true,
  rootMargin = "100px 0px 0px 0px",
  threshold = 0,
  debug = false,
}) {
  function log(...args) {
    if (debug) {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  }

  if (typeof loadMore !== "function") {
    throw new TypeError(
      "useInfiniteLoader: loadMore must be a function and is required"
    );
  }
  const loaderRef = React.useRef(null);
  const page = React.useRef(startFromPage);
  const observer = React.useRef(null);
  React.useEffect(() => {
    if (!observer.current && initialise === true) {
      log("Initialised");
      observer.current = new IntersectionObserver(
        ([target]) => {
          log("Observer invoked");
          if (target.intersectionRatio <= 0) {
            log("Intersection ratio not met, bailing");
            return;
          }
          if (canLoadMore === false) {
            log("Can load more is false, bailing");
            return;
          }
          log("Loading more...");
          loadMore(page.current);
          page.current += 1;
        },
        { rootMargin, threshold }
      );
      if (loaderRef.current) {
        log("Observing loader ref");
        observer.current.observe(loaderRef.current);
      }
    }
    return () => {
      if (observer && observer.current) {
        observer.current.disconnect();
        observer.current = undefined;
      }
    };
  }, [canLoadMore, loadMore, page, initialise]);
  return { loaderRef, page: page.current };
}
