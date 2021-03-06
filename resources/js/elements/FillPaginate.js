import React from 'react'
import { Pagination } from 'react-bootstrap';
import { setParams } from '../utils/links';


export const FillPaginate = ({ data, setPage, page }) => {

    const fillPages = (data) => {
        let items = [];
        let { last_page, current_page } = data
        let nextEllipsis = false;

        items.push(
            <Pagination.First key={1} onClick={() => hadleSetPage(1)} />
        )
        items.push(
            <Pagination.Prev key={2} onClick={() => hadleSetPage(page === 1 ? 1 : page - 1)} />
        )

        for (let num = 1; num <= last_page; num++) {

            if ((num > (current_page - 3) && num < (current_page + 3)) || num > (last_page - 3) || num <= 3) {
                items.push(
                    <Pagination.Item key={num + 3} active={num === current_page} onClick={() => hadleSetPage(num)}>
                        {num}
                    </Pagination.Item>,
                );
                nextEllipsis = true;

            } else {
                if (nextEllipsis) {
                    items.push(<Pagination.Ellipsis key={num + 3} />);
                    nextEllipsis = false;
                }
            }

        }

        items.push(
            <Pagination.Next key={last_page + 4} onClick={() => hadleSetPage(page === last_page ? last_page : page + 1)} />
        )
        items.push(
            <Pagination.Last key={last_page + 5} onClick={() => hadleSetPage(last_page)} />
        )

        return items;
    }

    const hadleSetPage = (v) => {
        setParams('page', v)
        setPage(v)
    }

    return (
        <Pagination className='mt-3'>
            {!!data && fillPages(data)}
        </Pagination>
    );
}