### react-use-infinite-loader is currently in pre release, use with caution

# react-use-infinite-loader :infinity: :page_with_curl: :hourglass_flowing_sand:

> Super lightweight infinite loading hook for React apps

`react-use-infinite-loader` uses the [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to provide a performant solution to infinite scrolling that doesn't involve scroll event listeners.

:warning: Some older browsers may not support the `IntersectionObserver` API, however you can easily [polyfill the functionality with this](https://github.com/w3c/IntersectionObserver/tree/master/polyfill).

As the name suggests `react-use-infinite-loader` uses React Hooks, so you need to be using React function components to use this library.

## Usage
> See [`example/`](example/Example.jsx) for a full example (recommended), run it locally with `yarn start`). [Also view it in the browser](https://react-use-infinite-loader.netlify.app)

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
const [canLoadMore, setCanLoadMore] = React.useState(true);
const [data, setData] = React.useState([]);
const loadMore = React.useCallback((page) => {
  loadFromAPI(page).then(response => {
    setCanLoadMore(response.canLoadMore);
    setData(currentData => [...currentData, ...response.data]);
  });
});
const { loaderRef } = useInfiniteLoader({ loadMore, canLoadMore });
```
Give the `loaderRef` that's returned from the hook to a `div` that sits directly below your rendered content list. Give it a classname that you'll use in the next step.
```javascript
return (
  <>
    <h1>My App</h1>
    {items.map(item => <div>{item}</div>)}
    <div ref={loaderRef} className="loaderRef" />
  </>
);
```
Add the following CSS to your apps to allow the observer to see the div and know to load more data
```css
/* You can change the name here and in your JSX if you want to */
.loaderRef {
  width: 1px;
  height: 1px;
  position: absolute;
}
```

## API Reference

| Property     | Default value     | Description                                                                                              |
|-------------------|-------------------|----------------------------------------------------------------------------------------------------------|
| loadMore | **required** | Invoked when the user scrolls into the observable viewport + its rootMargin; read about rootMargin and thresholds [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options). |
| canLoadMore | `false` | Tells useInfiniteLoader whether to run `loadMore` when the observer is triggered, this is usually set dynamically. |
| rootMargin        | `"100px 0px 0px 0px"`     | [Read about `rootMargin` here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options). |
| threshold         | `0`           | [Read about `threshold` here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options). |
| initialise  | `true` | Used for if your data fetching library fetches page 0 and renders it when the component loads, to use this just have a state flag that you set to false once the initial load from your data fetching lib has happened.                                |
| startFromPage | `0` | Used if you already load page 0 on mount, you can tell useInfiniteLoader what page to begin loading more from. |
| debug | `false` | Prints some helpful messages about what useInfiniteLoader is doing |
