# react-use-infinite-loader :infinity: :page_with_curl: :hourglass_flowing_sand:

> Super lightweight infinite loading hook for React apps

`react-use-infinite-loader` uses the [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to provide a performant solution to infinite scrolling that doesn't involve scroll event listeners.

:warning: Some older browsers may not support the `IntersectionObserver` API, however you can easily [polyfill the functionality with this](https://github.com/w3c/IntersectionObserver/tree/master/polyfill).

As the name suggests `react-use-infinite-loader` uses React Hooks, so you need to be using React function components to use this library.

## Usage
> See [`example/`](example/Example.jsx) for a full example (recommended), run it locally with `yarn buildExample`). [Also view it in the browser](https://google.com)

Install with
```bash
yarn add react-use-infinite-loader
```
Add to your app
```javascript
import useInfiniteLoader from 'react-use-infinite-loader';
```
Implement the hook. Ensure that the initial content page size flows off the page so that the next page isn't instantly fetched
```javascript
const [hasMore, setHasMore] = React.useState(true);
const [data, setData] = React.useState([]);
const loadMore = React.useCallback((page) => {
  loadFromAPI(page).then(response => {
    setHasMore(response.hasMore);
    setData(currentData => [...currentData, ...response.data]);
  });
});
const { loaderRef } = useInfiniteLoader({ loadMore, hasMore });
```
Give the `loaderRef` that's returned from the hook to a `div` that sits directly below your rendered content list
```javascript
return (
  <>
    <h1>My App</h1>
    {items.map(item => <div>{item}</div>)}
    <div ref={loaderRef} />
  </>
);
```

## API Reference

| Property     | Default value     | Description                                                                                              |
|-------------------|-------------------|----------------------------------------------------------------------------------------------------------|
| loadMore | **required** | Invoked when the user scrolls into the observable viewport + its rootMargin; read about rootMargin and thresholds [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options). |
| hasMore | `false` | Tells useInfiniteLoader whether to run `loadMore` when the observer is triggered, this is usually set dynamically. |
| rootMargin        | `"100px 0px 0px 0px"`     | [Read about `rootMargin` here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options). |
| threshold         | `0`           | [Read about `threshold` here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options). |
| initialise  | `true` | Used for if your data fetching library fetches page 0 and renders it when the component loads, to use this just have a state flag that you set to false once the initial load from your data fetching lib has happened.                                |
| initialPage | `0` | Used if you already load page 0 on mount, you can tell useInfiniteLoader what page to begin loading more from. |
