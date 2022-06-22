import LoadingSpinner from '@app/components/atoms/LoadingSpinner/LoadingSpinner';
import Menu from '@app/components/layouts/Menu/Menu';
import {
  addFood,
  deleteFood,
  FoodDef,
  FoodResponse,
  getFoodByPaginationAndCategoryType,
  updateFood
} from '@app/features/food/food';
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { formatCurrency } from '@app/utils/functions';
import { useAppDispatch, useAppSelector } from '@app/redux/store';
import CustomModal from '@app/components/atoms/Modal/CustomModal';
import { Controller, useForm } from 'react-hook-form';
import FormInput from '@app/components/atoms/FormInput/FormInput';
import CustomSelect from '@app/components/atoms/CustomSelect/CustomSelect';
import { enumToastify } from '@app/types/atom.type';
import Toastify from '@app/components/atoms/Toastify/Toastify';
import Pagination from '@app/components/atoms/Pagination/Pagination';
import styles from './Setting.module.scss';
import cx from 'classnames';
import ReactModal from 'react-modal';
import {
  addCategory,
  deleteCategory,
  updateCategory
} from '@app/features/category/api/category.api';
import { getCategories } from '@app/features/category/redux/category.slice';
import { CategoryDef } from '@app/features/category/category';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#1F1D2B',
    borderRadius: '1rem',
    width: 'fit-content',
    height: 'fit-content',
    border: 'none'
  },
  overlay: {
    background: 'rgba(0,0,0,0.6)',
    cursor: 'pointer'
  }
};

function Setting() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.category.categories);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [urlImage, setUrlImage] = useState('');
  const inputImage = useRef<any>();
  const [fileData, setFileData] = useState<any>(null);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [statusToast, setStatusToast] = useState({
    type: enumToastify.success,
    message: 'Thêm thành công'
  });
  const toastRef = useRef<any>();
  const location = useLocation();
  const [listFood, setListFood] = useState<FoodResponse>({
    data: [],
    totalPage: 0,
    page: 0,
    limit: 0
  });
  const [paginate, setPaginate] = useState({
    current: 1,
    total: 1
  });
  const [isEdit, setIsEdit] = useState(false);
  const [idFood, setIdFood] = useState('');
  const [searchParams] = useSearchParams();
  useEffect(() => {
    getData();
  }, [location]);
  const getData = () => {
    setIsLoading(true);
    setListFood({
      data: [],
      totalPage: 0,
      page: 0,
      limit: 0
    });
    const page = searchParams.get('page') || 1;
    const type =
      searchParams.get('type') || (categories[0] && categories[0].name) || '';
    const keyword = searchParams.get('keyword') || '';
    getFoodByPaginationAndCategoryType(Number(page), type, keyword)
      .then(res => {
        setIsLoading(false);
        const convertData = res.data.data.map(item => {
          return { ...item, isChecked: false };
        });
        setListFood({ ...res.data, data: convertData });
        setPaginate({
          current: Number(res.data.page),
          total: Number(res.data.totalPage)
        });
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  const renderFood = () => {
    const result = listFood.data.map((food, index) => {
      return (
        <div
          className="text-center border-solid-gray rounded-lg relative flex flex-col justify-end"
          key={food._id}
        >
          <div
            className={cx(
              'absolute top-3 left-3 cursor-pointer',
              styles.checkbox,
              food.isChecked ? styles.checked : ''
            )}
            onClick={() => checkedFood(index)}
          >
            {food.isChecked && (
              <span className="material-icons-outlined text-dark-second">
                done
              </span>
            )}
          </div>
          <div className="mb-3 flex-center mt-6">
            <img
              className="w-[130px] h-[130px] rounded-full object-cover"
              src={food.url_img}
              alt=""
            />
          </div>
          <p className="px-3">{food.name}</p>
          <p className="mb-4 mt-2 text-[#ABBBC2]">
            {formatCurrency(food.price)}
          </p>
          <button
            className="flex-center w-full bg-[#50343A] text-[#EA7C69] py-4 rounded-b-lg cursor-pointer"
            onClick={() => editFood(food)}
          >
            <span className="material-icons-outlined">edit</span>Sửa món ăn
          </button>
        </div>
      );
    });
    return result;
  };

  const { handleSubmit, formState, control, setValue } = useForm<any>({
    mode: 'onChange'
  });
  const [category, setCategory] = useState<any>({
    title: categories.length > 0 ? categories[0].name : '',
    value: categories.length > 0 ? categories[0]._id : ''
  });
  const onChangeFileImage = (e: any) => {
    setFileData(e);
    const file = e.target.files[0];
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = () => {
      setUrlImage(URL.createObjectURL(file));
    };
  };
  //add food
  const onSubmit = async (data: any) => {
    setIsLoadingButton(true);
    const formData = new FormData();
    formData.append('name', data.food_name);
    formData.append('price', data.food_price);
    formData.append('category_id', category.value);
    if (fileData) {
      if (isEdit) {
        formData.append('recfile', fileData.target.files[0]);
      } else {
        formData.append('file', fileData.target.files[0]);
      }
    } else {
      formData.append('url_img', urlImage);
    }
    try {
      if (isEdit) {
        await updateFood(idFood, formData);
      } else {
        await addFood(formData);
      }
      closeModal();
      showToast(`${isEdit ? 'Cập nhật' : 'Thêm'} món ăn thành công`);
      setUrlImage('');
      setFileData(null);
    } catch {
      closeModal();
      showToast(`${isEdit ? 'Cập nhật' : 'Thêm'} món ăn thất bại`, true);
      setUrlImage('');
      setFileData(null);
    }
    getData();
    setIsLoadingButton(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEdit(false);
    setUrlImage('');
    setFileData(null);
    setCategory({
      title: categories.length > 0 ? categories[0].name : '',
      value: categories.length > 0 ? categories[0]._id : ''
    });
    setValue('food_name', '');
    setValue('food_price', '');
    setUrlImage('');
  };
  // edit
  const editFood = (food: FoodDef) => {
    setIdFood(food._id);
    setIsEdit(true);
    const category = categories.find(
      category => category._id === food.category
    );
    setCategory({
      title: category?.name,
      value: category?._id
    });
    setValue('food_name', food.name);
    setValue('food_price', food.price);
    setUrlImage(food.url_img);
    setShowModal(true);
  };

  // checkbox
  const checkedFood = (index: number) => {
    const dummyList = [...listFood.data];
    dummyList[index].isChecked = !dummyList[index].isChecked;
    setListFood({ ...listFood, data: dummyList });
  };
  const [showModalDelete, setShowModalDelete] = useState(false);
  const openModalDelete = () => {
    setShowModalDelete(true);
  };
  const closeModalDelete = () => {
    setShowModalDelete(false);
  };
  const handleDeleteFood = () => {
    const ids = listFood.data
      .filter(item => item.isChecked)
      .map(food => food._id);
    if (!ids.length) {
      return;
    }
    setIsLoading(true);
    deleteFood(ids)
      .then(() => {
        setIsLoading(false);
        closeModalDelete();
        getData();
        showToast(`Xóa món ăn thành công`);
      })
      .catch(() => {
        setIsLoading(false);
        closeModalDelete();
        showToast(`Xóa món ăn thất bại`, true);
      });
  };

  const showToast = (message: string, err = false) => {
    if (!err) {
      setStatusToast({
        type: enumToastify.success,
        message
      });
      toastRef.current.showToast();
    } else {
      setStatusToast({
        type: enumToastify.error,
        message
      });
      toastRef.current.showToast();
    }
  };
  //categories
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [showModalAddCategory, setShowModalAddCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [showModalDeleteCategory, setShowModalDeleteCategory] = useState(false);
  const [categoryDelete, setCategoryDelete] = useState<CategoryDef | null>(
    null
  );
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const listCategories = useMemo(() => {
    return categories.map(item => {
      return {
        ...item,
        isEdit: false
      };
    });
  }, [categories]);
  useEffect(() => {
    setDummyCategories(listCategories);
  }, [categories]);

  const [dummyCategories, setDummyCategories] = useState(listCategories);
  const closeModalCategory = () => {
    setShowModalCategory(false);
  };
  const closeModalDeleteCategory = () => {
    setShowModalDeleteCategory(false);
  };
  const changeCategoryName = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const listFakeCategories = [...dummyCategories];
    listFakeCategories[index].name = e.target.value;
    setDummyCategories(listFakeCategories);
  };
  const editCategoryName = async (index: number) => {
    if (dummyCategories[index].isEdit) {
      if (!dummyCategories[index]?.name) {
        return;
      }
      setIsLoadingEdit(true);
      try {
        await updateCategory(
          dummyCategories[index]?._id ?? '',
          dummyCategories[index]?.name ?? ''
        );
        showToast(`Cập nhật thành công`);
        await dispatch(getCategories());
      } catch {
        showToast(`Cập nhật thất bại`, true);
      }
      setIsLoadingEdit(false);
      return;
    }
    const listFakeCategories = [...dummyCategories];
    listFakeCategories[index].isEdit = true;
    setDummyCategories(listFakeCategories);
  };
  const renderCategories = () => {
    if (!dummyCategories.length) {
      return null;
    }
    const result = dummyCategories.map((category, index) => {
      return (
        <div className="min-w-[30rem] flex mb-4" key={index}>
          <FormInput
            value={category.name}
            disabled={!category.isEdit}
            onChange={e => changeCategoryName(e, index)}
          />
          <button
            className="flex-center btn-primary-outline p-3 mx-3"
            onClick={() => {
              setCategoryDelete(category);
              setShowModalDeleteCategory(true);
            }}
          >
            <span className="material-icons-outlined">delete</span>
          </button>
          <button
            className="flex-center btn-primary-outline p-3"
            onClick={() => editCategoryName(index)}
          >
            {isLoadingEdit && category.isEdit ? (
              <LoadingSpinner size={20} />
            ) : (
              <span className="material-icons-outlined">
                {!category.isEdit ? 'edit' : 'done'}
              </span>
            )}
          </button>
        </div>
      );
    });
    return result;
  };
  //add category
  const closeModalAddCategory = () => {
    setShowModalAddCategory(false);
  };
  const handleAddCategory = async (e: FormEvent) => {
    e.preventDefault();
    if (!categoryName) {
      return;
    }
    setIsLoading(true);
    try {
      await addCategory(categoryName);
      closeModalAddCategory();
      showToast(`Thêm thể loại thành công`);
      await dispatch(getCategories());
    } catch {
      showToast(`Thêm thể loại thất bại`, true);
    }
    setCategoryName('');
    setIsLoading(false);
  };
  // delete category
  const handleDeleteCategory = async () => {
    setIsLoading(true);
    try {
      await deleteCategory(categoryDelete?._id ?? '');
      setShowModalDeleteCategory(false);
      showToast(`Xóa thể loại thành công`);
      dispatch(getCategories());
    } catch {
      setShowModalDeleteCategory(false);
      showToast(`Xóa thể loại thất bại`);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-dark min-h-[100vh] text-white px-8">
      <p className="text-3xl mb-6 pt-6">Settings</p>
      <div className="bg-dark-second px-6 py-9 rounded-lg">
        <div className="flex justify-between items-center mb-8 flex-wrap">
          <p className="text-2xl mb-2">Quản lý thực đơn</p>
          <div className="flex flex-wrap">
            <button
              className="flex px-2 py-1 bg-[#9D0505] rounded-lg mr-4"
              onClick={openModalDelete}
            >
              <span className="material-icons-outlined">delete</span>
              Xóa món ăn
            </button>
            <button
              className="flex px-2 py-1 border-solid-gray rounded-lg"
              onClick={() => setShowModalCategory(true)}
            >
              <span className="material-icons-outlined">category</span>
              <span>Quản lý thể loại</span>
            </button>
          </div>
        </div>
        <Menu />
        {isLoading && (
          <div className="flex justify-center">
            {' '}
            <LoadingSpinner size={40} primaryColor />
          </div>
        )}
        <div className="grid grid-cols-192 place-content-between gap-3 mb-12">
          <div
            className="text-center border-dashed-primary rounded-lg text-primary flex-center flex-col cursor-pointer min-h-[296px]"
            onClick={() => setShowModal(true)}
          >
            <span className="material-icons-outlined mb-3 text-3xl">add</span>
            <p>Thêm món ăn</p>
          </div>
          {renderFood()}
        </div>
      </div>
      <CustomModal isShow={showModal} closeModal={closeModal}>
        <p className="font-semibold text-3xl text-white mt-16">
          {isEdit ? 'Cập nhật' : 'Thêm'} sản phẩm
        </p>
        <p className="h-[1px] w-full bg-[#393C49] mt-8 mb-5"></p>
        <form onSubmit={handleSubmit(onSubmit)} className="text-white">
          <p className="mb-1">Thể loại:</p>
          <CustomSelect
            width={200}
            data={
              categories.length > 0
                ? categories.map(item => {
                    return {
                      value: item._id,
                      title: item.name
                    };
                  })
                : []
            }
            value={category}
            onChange={(category: any) => setCategory(category)}
          />
          <p className="mt-4">Tên món ăn:</p>
          <Controller
            control={control}
            name="food_name"
            rules={{
              required: 'Tên món ăn không được để trống.'
            }}
            render={({
              field: { onChange, name, value },
              fieldState: { error }
            }) => (
              <FormInput
                name={name}
                value={value}
                error={error?.message}
                onChange={onChange}
                type="text"
              />
            )}
          />
          <p className="mt-4">Giá:</p>
          <Controller
            control={control}
            name="food_price"
            rules={{
              required: 'Giá không được để trống.',
              pattern: {
                value: /^[0-9_\s]+$/,
                message: 'Giá phải là một số nguyên lớn hơn 0.'
              }
            }}
            render={({
              field: { onChange, name, value },
              fieldState: { error }
            }) => (
              <FormInput
                name={name}
                error={error?.message}
                onChange={onChange}
                type="number"
                value={value}
              />
            )}
          />
          <p className="mt-4">Ảnh:</p>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="btn-primary w-[100px]"
              onClick={() => inputImage.current.click()}
            >
              Thêm ảnh
            </button>
            <input
              ref={inputImage}
              type="file"
              hidden
              onChange={onChangeFileImage}
            />
            {urlImage && (
              <img
                src={urlImage}
                alt=""
                className="w-[7rem] h-[7rem] rounded-xl object-cover"
              />
            )}
          </div>
          <div className="flex gap-3 mt-9">
            <button
              type="button"
              className="btn-primary-outline flex-1"
              onClick={closeModal}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={!formState.isValid}
              className={`btn-primary flex-center flex-1 ${
                !formState.isValid || (!fileData && !isEdit) || !category.value
                  ? 'opacity-50 pointer-events-none'
                  : ''
              }`}
            >
              {isLoadingButton ? (
                <LoadingSpinner size={20} />
              ) : (
                <span>{isEdit ? 'Cập nhật' : 'Thêm'}</span>
              )}
            </button>
          </div>
        </form>
      </CustomModal>

      {/* Delete food */}
      <ReactModal
        onRequestClose={closeModalDelete}
        isOpen={showModalDelete}
        shouldCloseOnOverlayClick
        style={customStyles}
      >
        <div className="text-white px-6">
          <p className="text-3xl mb-8 mt-3">Xác nhận xóa</p>
          <p>
            Bạn chắc chắn muốn xóa{' '}
            {listFood.data.filter(item => item.isChecked).length} món ăn này chứ
            ?
          </p>
          <div className="mt-10 mb-7 flex justify-end">
            <button
              className="btn-primary-outline w-[100px] mr-3"
              onClick={closeModalDelete}
            >
              Hủy bỏ
            </button>
            <button
              className="flex-center btn-primary w-[100px]"
              onClick={handleDeleteFood}
            >
              {isLoading && <LoadingSpinner size={20} />}
              Xóa
            </button>
          </div>
        </div>
      </ReactModal>
      {/* End delete food */}

      {/* Categories */}
      <ReactModal
        onRequestClose={closeModalCategory}
        isOpen={showModalCategory}
        shouldCloseOnOverlayClick
        style={customStyles}
      >
        <div className="text-white">
          <div className="flex items-center mb-8">
            <p className="text-3xl mr-5">Thể loại</p>
            <button
              className="flex-center btn-primary-outline p-3"
              onClick={() => setShowModalAddCategory(true)}
            >
              <span className="material-icons-outlined">add</span>
            </button>
          </div>
          <div>{renderCategories()}</div>
        </div>
      </ReactModal>

      {/* Add */}
      <ReactModal
        onRequestClose={closeModalAddCategory}
        isOpen={showModalAddCategory}
        shouldCloseOnOverlayClick
        style={customStyles}
      >
        <form onSubmit={handleAddCategory}>
          <div className="text-white">
            <p className="text-3xl mb-6">Tạo thể loại</p>
            <p className="mb-2">Tên thể loại:</p>
            <div className="min-w-[20rem]">
              <FormInput
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
              />
            </div>
            <div className="h-[2px] w-full bg-dark mt-4 mb-6"></div>
            <div className="flex gap-4">
              <button
                type="button"
                className="w-full btn-primary-outline flex-center"
                onClick={closeModalAddCategory}
              >
                Hủy bỏ
              </button>
              <button type="submit" className="w-full btn-primary flex-center">
                {isLoading ? <LoadingSpinner size={20} /> : <span>Tạo</span>}
              </button>
            </div>
          </div>
        </form>
      </ReactModal>
      {/* End add */}

      {/* Confirm delete */}
      <ReactModal
        onRequestClose={closeModalDeleteCategory}
        isOpen={showModalDeleteCategory}
        shouldCloseOnOverlayClick
        style={customStyles}
      >
        <div className="text-white px-6">
          <p className="text-3xl mb-8 mt-3">Xác nhận xóa</p>
          <p>
            Bạn chắc chắn muốn xóa thể loại{' '}
            <span className="text-red-600">{categoryDelete?.name}</span> chứ ? ?
          </p>
          <div className="mt-10 mb-7 flex justify-end">
            <button
              className="btn-primary-outline w-[100px] mr-3"
              onClick={closeModalDeleteCategory}
            >
              Hủy bỏ
            </button>
            <button
              className="flex-center btn-primary w-[100px]"
              onClick={handleDeleteCategory}
            >
              {isLoading ? <LoadingSpinner size={20} /> : <span>'Xóa'</span>}
            </button>
          </div>
        </div>
      </ReactModal>
      {/* End Confirm delete */}
      {/* End categories */}

      <Toastify
        type={statusToast.type}
        message={statusToast.message}
        ref={toastRef}
      />
      <Pagination totalPage={paginate.total} currentPage={paginate.current} />
    </div>
  );
}

export default Setting;
