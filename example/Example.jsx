import React from "react";
import useInfiniteLoader from "../useInfiniteLoader";
import getMoreItems from "./api";

function App() {
  const [items, setItems] = React.useState([]);
  const [canLoadMore, setCanLoadMore] = React.useState(true);
  const loadMore = React.useCallback((page) => {
    getMoreItems(page).then((response) => {
      if (response.canLoadMore !== canLoadMore) {
        setCanLoadMore(response.canLoadMore);
      }
      setItems((currentItems) => [...currentItems, ...response.items]);
    });
  }, []);

  // Only two things returned; loaderRef to be passed to your observable div
  // and the current page if you'd like to show it somewhere
  const { loaderRef, page } = useInfiniteLoader({
    // Invoked when the user scrolls into the observable viewport + it's rootMargin
    // read about rootMargin and thresholds here https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
    loadMore,

    // If this is false useInfiniteLoader no longer invokes `loadMore` when it usually does
    canLoadMore,

    // Not used in this example. Used if you already load page 0 on mount, you can tell
    // useInfiniteLoader what page to begin loading more from
    // startFromPage: 0,

    // Not used in this simple example. Used for if your data fetching library fetches
    // page 0 and renders it when the component loads, to use this just have a state flag
    // that you set to false once the initial load from your data fetching lib has happened.
    // initialise: initialLoad === false,

    // Passed directly to the intersection observer https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
    // Set to 5px top margin to allow you to see the loading effect easier in this demo
    rootMargin: "0px 0px 0px 0px",

    // Passed directly to the intersection observer https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
    // threshold: 0,

    debug: true,
  });

  return (
    <>
      <h1>useInfiniteLoader Example 1</h1>
      <a href="example2">Click for example 2</a>
      <hr />
      {items.map((number) => (
        <div className="item" key={number}>
          Number {number}
        </div>
      ))}
      {/* Super important that this observable div sits directly below the content
      you're loading in, note that in this case we don't need the `loaderRef`
      mentioned in the usage docs as we have a loading div that sits below it
      and is always visible (until we can't load any more data) */}
      <div ref={loaderRef} />
      {/* Put whatever you'd like to show below, usually a loader! */}
      {canLoadMore && <div className="info">Loading page {page + 1}...</div>}
      {canLoadMore === false && (
        <div className="info">No more items to load</div>
      )}
    </>
  );
}

export default App;
