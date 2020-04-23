"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useInfiniteLoader;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useInfiniteLoader(_ref) {
  var _ref$initialPage = _ref.initialPage,
      initialPage = _ref$initialPage === void 0 ? 0 : _ref$initialPage,
      loadMore = _ref.loadMore,
      _ref$hasMore = _ref.hasMore,
      hasMore = _ref$hasMore === void 0 ? false : _ref$hasMore,
      _ref$initialise = _ref.initialise,
      initialise = _ref$initialise === void 0 ? true : _ref$initialise,
      _ref$rootMargin = _ref.rootMargin,
      rootMargin = _ref$rootMargin === void 0 ? "100px 0px 0px 0px" : _ref$rootMargin,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === void 0 ? 0 : _ref$threshold;

  if (typeof loadMore !== "function") {
    throw new TypeError("useInfiniteLoader: loadMore must be a function and is required");
  }

  var loaderRef = _react.default.useRef(null);

  var page = _react.default.useRef(initialPage);

  var observer = _react.default.useRef(null);

  _react.default.useEffect(function () {
    if (!observer.current && initialise === true) {
      observer.current = new IntersectionObserver(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 1),
            target = _ref3[0];

        if (target.intersectionRatio <= 0) {
          return;
        }

        if (hasMore === false) {
          return;
        }

        loadMore(page.current);
        page.current += 1;
      }, {
        rootMargin: rootMargin,
        threshold: threshold
      });

      if (loaderRef.current) {
        observer.current.observe(loaderRef.current);
      }
    }

    return function () {
      if (observer && observer.current) {
        observer.current.disconnect();
        observer.current = undefined;
      }
    };
  }, [hasMore, loadMore, page, initialise]);

  return {
    loaderRef: loaderRef,
    page: page.current
  };
}
