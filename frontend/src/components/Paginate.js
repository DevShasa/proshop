import React from 'react';
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({pages, page, searchParams="", isAdmin=false}) =>{

    // why we need to split
    // http://localhost:3000/?keyword=&page=1
    // http://localhost:3000/?keyword=?keyword=&page=1&page=1
    // the split gets what is between ?keyword AND & 
    let keyword = ""
    if(searchParams){
        keyword = searchParams.split(`?keyword=`)[1].split('&')[0]
    }

    console.log('KEYWORD>',keyword)

    return(
        <>
            {pages > 1
                ? ( 
                    <Pagination>
                        {[...Array(pages).keys()].map((p)=>(
                            <LinkContainer 
                                key={p+1} 
                                to={!isAdmin 
                                    ? `/?keyword=${keyword}&page=${p+1}`
                                    : `/admin/productlist/?keyword=${keyword}&page=${p+1}`
                                }
                            >
                                <Pagination.Item active={p+1 === page}>
                                    {p+1}
                                </Pagination.Item>
                            </LinkContainer>
                        ))}
                    </Pagination>)
                : <div>Page 1 of 1</div>
            }
        </>
    )

}
export default Paginate 