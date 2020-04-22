import React from "react";
import useInfiniteLoader from "../useInfiniteLoader";

// API
const pageSize = 20;
const exampleData = Array.from({ length: pageSize * 8 }).map(
  (_, index) => index
);
function getMoreItems(page) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pageStart = page * pageSize;
      const nextPageStart = (page + 1) * pageSize;
      resolve({
        items: exampleData.slice(pageStart, pageStart + pageSize),
        hasMore:
          exampleData.slice(nextPageStart, nextPageStart + pageSize).length ===
          pageSize,
      });
    }, 750);
  });
}

function App() {
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const loadMore = React.useCallback((page) => {
    setLoading(true);
    getMoreItems(page).then((response) => {
      if (response.hasMore !== hasMore) {
        setHasMore(response.hasMore);
      }
      setItems((currentItems) => [...currentItems, ...response.items]);
      setLoading(false);
    });
  }, []);

  // Only two things returned; loaderRef to be passed to your observable div
  // and the current page if you'd like to show it somewhere
  const { loaderRef, page } = useInfiniteLoader({
    // Invoked when the user scrolls into the observable viewport + it's rootMargin
    // read about rootMargin and thresholds here https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
    loadMore,

    // If this is false useInfiniteLoader no longer invokes `loadMore` when it usually does
    hasMore,

    // Not used in this example. Used if you already load page 0 on mount, you can tell
    // useInfiniteLoader what page to begin loading more from
    // initialPage: 0,

    // Not used in this simple example. Used for if your data fetching library fetches
    // page 0 and renders it when the component loads, to use this just have a state flag
    // that you set to false once the initial load from your data fetching lib has happened.
    // initialise: initialLoad === false,

    // Passed directly to the intersection observer https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
    // Set to 0px top margin to allow you to see the loading effect easier in this demo
    rootMargin: "0px 0px 0px 0px",

    // Passed directly to the intersection observer https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
    // threshold: 0,
  });

  return (
    <>
      <h1>useInfiniteLoader Demo</h1>
      <div>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options"
          target="_blank"
          rel="noopener noreferrer"
        >
          <code>rootMargin</code>
        </a>{" "}
        is set to <code>0px</code> to show the loading functionality, usually
        you would have a higher <code>rootMargin</code> like <code>100px</code>{" "}
        (default) to ensure the next page is loaded before the user has scrolled
        to the bottom of the page
      </div>
      <hr />
      {items.map((number) => (
        <div className="item" key={number}>
          Number {number}
        </div>
      ))}
      {/* Super important that this observable div sits directly below the content you're loading in */}
      <div ref={loaderRef} />
      {/* Put whatever you'd like to show below, usually a loader! */}
      {loading === true && (
        <div className="info">Loading page {page + 1}...</div>
      )}
      {hasMore === false && <div className="info">No more items to load</div>}
    </>
  );
}

export default App;
