import LoadingSpinner from '@app/components/atoms/LoadingSpinner/LoadingSpinner';
import CustomModal from '@app/components/atoms/Modal/CustomModal';
import Menu from '@app/components/layouts/Menu/Menu';
import {
  FoodResponse,
  getFoodByPaginationAndCategoryType
} from '@app/features/food/food';
import Food from '@app/features/food/screens/Food/Food';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import OrderSidebar from '@app/features/orders/screens/OrderSidebar/OrderSidebar';
import Toastify from '@app/components/atoms/Toastify/Toastify';
import { enumToastify } from '@app/types/atom.type';
import Pagination from '@app/components/atoms/Pagination/Pagination';
import { useAppSelector } from '@app/redux/store';
import Moment from 'react-moment';

function Home() {
  const orders = useAppSelector(state => state.order.listOrder);
  const categories = useAppSelector(state => state.category.categories);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  //state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShow, setIsShow] = useState(false);
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [listFood, setListFood] = useState<FoodResponse>({
    data: [],
    totalPage: 0,
    page: 0,
    limit: 0
  });
  const toastRef = useRef<any>();
  const [statusToast, setStatusToast] = useState({
    type: enumToastify.success,
    message: 'Thêm thành công'
  });
  const [paginate, setPaginate] = useState({
    current: 1,
    total: 1
  });

  //handle pagination
  useEffect(() => {
    if (categories[0] && categories[0].name) {
      setIsLoading(true);
      setListFood({
        data: [],
        totalPage: 0,
        page: 0,
        limit: 0
      });
      const page = searchParams.get('page') || 1;
      const type = searchParams.get('type') || categories[0].name;
      const keyword = searchParams.get('keyword') || '';
      getFoodByPaginationAndCategoryType(Number(page), type, keyword)
        .then(res => {
          setIsLoading(false);
          setListFood(res.data);
          setPaginate({
            current: Number(res.data.page),
            total: Number(res.data.totalPage)
          });
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [location, categories]);

  // render list food
  const showListFood = () => {
    if (listFood.data.length > 0) {
      const result = listFood.data.map((f, index) => (
        <Food
          key={index}
          _id={f._id}
          name={f.name}
          price={f.price}
          avaiable={f.avaiable}
          url_img={f.url_img}
          createOrder={addOder}
        />
      ));
      return result;
    }
  };

  // handle modal
  const closeModalAndNotify = (success: boolean = false) => {
    setIsShow(false);
    if (success) {
      setStatusToast({
        message: 'Create order success',
        type: enumToastify.success
      });
    } else {
      setStatusToast({
        message: 'Create order fail',
        type: enumToastify.error
      });
    }
    toastRef.current.showToast();
  };
  const closeModal = () => {
    setIsShow(false);
  };
  const addOder = () => {
    setIsShow(true);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    let type = searchParams.get('type');
    let searchType = { keyword: keyword } as any;
    if (type) {
      searchType = { keyword, type };
    }
    setSearchParams(searchType);
  };
  return (
    <div className="bg-dark min-h-[100vh] text-white pt-8 px-14">
      <div className="flex items-end justify-between flex-wrap">
        <div>
          <p className="text-3xl">Nấm Store</p>
          <p className="mb-6 mt-1">
            <Moment format="ll">{new Date().toISOString()}</Moment>
          </p>
        </div>
        <form onSubmit={handleSearch}>
          <div className="bg-[#2D303E] rounded-lg border-solid border-[#393C49] border-[1px] flex items-center p-3">
            <span className="material-icons-outlined text-white mr-2">
              search
            </span>
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Search for food, coffe, etc.."
              className="placeholder:text-[#ABBBC2] bg-transparent outline-none border-none"
            />
          </div>
        </form>
      </div>
      <div className="flex justify-between items-end">
        <p className="mb-4 mt-6 text-xl font-bold">Chọn món</p>
        <div
          className="relative cursor-pointer"
          onClick={() => navigate('/checkout')}
        >
          <span className="absolute top-0 right-[-14px] w-[1.2rem] h-[1.2rem] rounded-full bg-primary text-white flex-center">
            {orders.length}
          </span>
          <span className="material-icons-outlined text-primary text-4xl">
            shopping_cart
          </span>
        </div>
      </div>
      <Menu />
      <Toastify
        type={statusToast.type}
        message={statusToast.message}
        ref={toastRef}
      />
      <CustomModal isShow={isShow} closeModal={closeModal}>
        <OrderSidebar
          closeModal={closeModal}
          closeModalAndNotify={closeModalAndNotify}
        />
      </CustomModal>
      {isLoading && (
        <div className="flex justify-center">
          {' '}
          <LoadingSpinner size={40} primaryColor />
        </div>
      )}
      <div className="grid grid-cols-192 place-items-center justify-center gap-10 mb-12">
        {showListFood()}
      </div>
      <Pagination totalPage={paginate.total} currentPage={paginate.current} />
    </div>
  );
}

export default Home;
