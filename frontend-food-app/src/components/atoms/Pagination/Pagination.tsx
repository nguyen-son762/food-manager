import { memo } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
type Props = {
  totalPage: number;
  pageRangeDisplayed?: number;
  currentPage: number;
};
const Pagination = ({
  totalPage,
  pageRangeDisplayed = 3,
  currentPage
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePageClick = (selectedItem: { selected: number }) => {
    searchParams.set('page', selectedItem.selected + 1 + '');
    setSearchParams(searchParams);
  };
  return (
    <div className="flex-center">
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span className="material-icons-outlined text-[28px] leading-[3rem]">
            arrow_forward_ios
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageRangeDisplayed}
        pageCount={totalPage}
        forcePage={currentPage - 1}
        previousLabel={
          <span className="material-icons-outlined text-[28px] leading-[3rem]">
            arrow_back_ios
          </span>
        }
        disabledLinkClassName="text-[#9b5a55]"
        previousLinkClassName="text-primary leading-[1rem]"
        nextLinkClassName="text-primary leading-[1rem]"
        containerClassName="flex items-center"
        activeLinkClassName="!bg-primary !text-[#fff] rounded-lg"
        pageLinkClassName="text-lg px-[10px] py-1 text-base bg-[#2D303E] mx-2 rounded-lg text-[#889898] border border-[#393C49]"
      />
    </div>
  );
};

export default memo(Pagination);
