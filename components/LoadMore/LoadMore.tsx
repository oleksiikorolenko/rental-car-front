"use client";
import css from "./LoadMore.module.css"

type LoadMoreProps = {
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  hasCars: boolean;
  onFetchNextPage: () => void;
};

export default function LoadMoreSection({
  hasNextPage,
  isFetchingNextPage,
  isFetching,
  hasCars,
  onFetchNextPage,
}: LoadMoreProps) {
  return (
    <div className={css.btn_container}>
      {hasNextPage && (
        <button
          type="button"
          onClick={onFetchNextPage}
          disabled={isFetchingNextPage}
          className={css.load_btn}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}

      {!hasNextPage && hasCars && (
        <p className={css.message}>
          All filtered cars.
        </p>
      )}

      {isFetching && !isFetchingNextPage && (
        <p className={css.message}>Updating data…</p>
      )}
    </div>
  );
}