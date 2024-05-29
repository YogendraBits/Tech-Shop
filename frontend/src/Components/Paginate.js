import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    return (
        pages > 1 && (
            <Pagination className="justify-content-center mt-4 custom-pagination">
                <LinkContainer
                    to={
                        !isAdmin
                            ? keyword
                                ? `/search/${keyword}/page/${page > 1 ? page - 1 : 1}`
                                : `/page/${page > 1 ? page - 1 : 1}`
                            : `/admin/productlist/${page > 1 ? page - 1 : 1}`
                    }
                >
                    <Pagination.Prev disabled={page === 1} className="custom-pagination-item">
                        <i className="fas fa-chevron-left"></i> Prev
                    </Pagination.Prev>
                </LinkContainer>

                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        to={
                            !isAdmin
                                ? keyword
                                    ? `/search/${keyword}/page/${x + 1}`
                                    : `/page/${x + 1}`
                                : `/admin/productlist/${x + 1}`
                        }
                    >
                        <Pagination.Item active={x + 1 === page} className="custom-pagination-item">
                            {x + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}

                <LinkContainer
                    to={
                        !isAdmin
                            ? keyword
                                ? `/search/${keyword}/page/${page < pages ? page + 1 : pages}`
                                : `/page/${page < pages ? page + 1 : pages}`
                            : `/admin/productlist/${page < pages ? page + 1 : pages}`
                    }
                >
                    <Pagination.Next disabled={page === pages} className="custom-pagination-item">
                        Next <i className="fas fa-chevron-right"></i>
                    </Pagination.Next>
                </LinkContainer>
            </Pagination>
        )
    );
};

export default Paginate;
