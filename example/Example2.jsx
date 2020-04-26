import React from "react";
import useInfiniteLoader from "../useInfiniteLoader";
import getMoreItems from "./api";

function App() {
  const [loading, setLoading] = React.useState(false);
  const [initialLoad, setInitialLoad] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [canLoadMore, setCanLoadMore] = React.useState(true);
  const loadMore = React.useCallback((page) => {
    setLoading(true);
    getMoreItems(page).then((response) => {
      if (response.canLoadMore !== canLoadMore) {
        setCanLoadMore(response.canLoadMore);
      }
      setItems((currentItems) => [...currentItems, ...response.items]);
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (initialLoad === true) {
      setLoading(true);
      getMoreItems(0).then((response) => {
        setItems((currentItems) => [...currentItems, ...response.items]);
        setLoading(false);
        setInitialLoad(false);
      });
    }
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
    startFromPage: 1,

    // Used for if your data fetching library fetches page 0 and renders it when the component
    // loads, to use this just have a state flag that you set to false once the initial load
    // from your data fetching lib has happened.
    initialise: initialLoad === false,

    // Passed directly to the intersection observer https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
    // Set to 0px top margin to allow you to see the loading effect easier in this demo
    rootMargin: "0px 0px 0px 0px",

    // Passed directly to the intersection observer https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
    // threshold: 0,

    debug: true,
  });

  return (
    <>
      <h1>useInfiniteLoader Example 2</h1>
      <a href="/">Click for example 1</a>
      <hr />
      <div>
        In this example we load the first page (indexed at 0) using a hook
        (useEffect) without invoking useInfiniteLoader, this simulates something
        like Apollo graphql where useQuery loads the first page before we can
        load more. Check out the code to see a simple state gate which ensures
        we only initialise useInfiniteLoader once the first API fetch is
        completed and also where we tell useInfiniteLoader to begin loading
        pages from 1.
      </div>
      <hr />
      {items.map((number) => (
        <div className="item" key={number}>
          Number {number}
        </div>
      ))}
      {/* Super important that this observable div sits directly below the content
      you're loading in, also ensure you have a class which sets the width and
      height to at least 1px to ensure the observer sees it */}
      <div ref={loaderRef} className="loaderRef" />
      {/* Put whatever you'd like to show below, usually a loader! */}
      {loading === true && (
        <div className="info">
          Loading page {initialLoad === true ? 1 : page + 1}...
        </div>
      )}
      {canLoadMore === false && (
        <div className="info">No more items to load</div>
      )}
    </>
  );
}

export default App;
