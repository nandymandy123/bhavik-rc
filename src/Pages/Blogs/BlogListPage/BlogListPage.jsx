import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import CardComponent from "../../../Components/CardComponent/CardComponent";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { blogApiInstance } from "../../../Services/apiService";
import "./BlogListPage.scss";

let START;
let LIMIT = 20;
let PAGE_NO = 0;

const BlogListPage = () => {
  const [listItems, setListItems] = useState([]);
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  useEffect(() => {
    fetchMoreListItems();

    return () => {
      START = 0;
      LIMIT = 10;
      PAGE_NO = 0;
    };
  }, []);

  async function fetchMoreListItems() {
    if (hasReachedEnd) {
      return;
    }

    START = PAGE_NO === 0 ? 0 : PAGE_NO * LIMIT;
    START === 0 && setIsFirstLoading(true);
    const result = await blogApiInstance.get(
      `posts?_start=${START}&_limit=${LIMIT}`
    );
    START === 0 && setIsFirstLoading(false);
    PAGE_NO += 1;

    setIsFetching(false);

    if (!result?.data.length) {
      setHasReachedEnd(true);
      return;
    }

    const posts = result.data;
    posts?.length && setListItems([...listItems, ...posts]);
  }

  return (
    <>
      <div className="main-wrap">
        <div className="title-txt">BlogListPage</div>

        {isFirstLoading ? (
          <div className="align-center">
            <Spinner />
          </div>
        ) : (
          <div className="cards-wrap">
            {listItems.map((listItem, index) => (
              <CardComponent
                key={`Blog${index}`}
                cardData={listItem}
                index={index++}
              />
            ))}
          </div>
        )}
      </div>

      {hasReachedEnd && <h4 className="align-center">That's All We Got...!</h4>}

      {isFetching && !hasReachedEnd && (
        <div className="align-center">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default BlogListPage;
