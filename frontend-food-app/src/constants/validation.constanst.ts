export const dataInput = [
  {
    label: 'Họ',
    name: 'first_name',
    rules: {
      required: 'Họ không được để trống.',
      maxLength: {
        value: 15,
        message: 'Họ tên không được vượt quá 59 ký tự'
      }
    },
    value: '',
    type: 'text'
  },
  {
    label: 'Tên',
    name: 'last_name',
    rules: {
      required: 'Tên không được để trống.',
      maxLength: {
        value: 15,
        message: 'Họ tên không được vượt quá 15 ký tự'
      }
    },
    value: '',
    type: 'text'
  },
  {
    label: 'Địa chỉ',
    name: 'address',
    rules: {
      required: 'Địa chỉ không được để trống.',
      maxLength: {
        value: 100,
        message: 'Địa chỉ không được vượt quá 100 ký tự'
      }
    },
    value: '',
    type: 'text'
  },
  {
    label: 'Số điện thoại',
    name: 'phonenumber',
    rules: {
      required: 'Số điện thoại không được để trống.',
      pattern: {
        value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
        message: 'Số điện thoại không hợp lệ'
      }
    },
    value: '',
    type: 'text'
  }
];
