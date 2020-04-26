const pageSize = 20;
const exampleData = Array.from({ length: pageSize * 8 }).map(
  (_, index) => index
);
export default function getMoreItems(page) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pageStart = page * pageSize;
      const nextPageStart = (page + 1) * pageSize;
      resolve({
        items: exampleData.slice(pageStart, pageStart + pageSize),
        canLoadMore:
          exampleData.slice(nextPageStart, nextPageStart + pageSize).length ===
          pageSize,
      });
    }, 750);
  });
}
