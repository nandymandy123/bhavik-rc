import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import { getBlogDetails } from "../../../Services/blogService";
import "./BlogDetailPage.scss";

const BlogDetailPage = (props) => {
  const { cardDetails } = props;

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState(null);

  const fetchPostDetails = async () => {
    setIsLoading(true);
    const [err, data] = await getBlogDetails(id);
    setIsLoading(false);

    if (data) {
      setBlog(data);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  return (
    <div className="detail-wrap">
      <div className="title-txt">BlogDetail Page</div>

      {isLoading ? (
        <div className="align-center">
          <Spinner />
        </div>
      ) : (
        <div className="detail-wrap">
          <img className="img-part" src="https://picsum.photos/200" />
          <div className="header-txt"> {blog?.title}</div>
          <div className="subheader-txt">{blog?.body}</div>
        </div>
      )}
    </div>
  );
};
export default BlogDetailPage;
