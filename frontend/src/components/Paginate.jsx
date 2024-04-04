import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => {
          // Determine the destination path inside the map function
          let destinationPath;
          if (!isAdmin) {
            destinationPath = keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`;
          } else {
            destinationPath = `/admin/productlist/${x + 1}`;
          }

          return (
            <LinkContainer key={x + 1} to={destinationPath}>
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          );
        })}
      </Pagination>
    )
  );
};

export default Paginate;
