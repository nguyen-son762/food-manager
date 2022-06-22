export const dataInputLogin = [
  {
    label: 'Tài khoản',
    name: 'username',
    rules: {
      required: 'Tài khoản không được để trống.',
      maxLength: {
        value: 15,
        message: 'Tài khoản không được vượt quá 15 ký tự'
      }
    },
    value: '',
    type: 'text'
  },
  {
    label: 'Mật khẩu',
    name: 'password',
    rules: {
      required: 'Mật khẩu không được để trống.',
      maxLength: {
        value: 15,
        message: 'Mật khẩu không được vượt quá 15 ký tự'
      }
    },
    value: '',
    type: 'password'
  }
];

export const dataInputRegister = [
  {
    label: 'Họ',
    name: 'first_name',
    rules: {
      required: 'Họ không được để trống.',
      maxLength: {
        value: 15,
        message: 'Họ không được vượt quá 15 ký tự'
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
    label: 'Email',
    name: 'email',
    rules: {
      required: 'Email không được để trống.',
      maxLength: {
        value: 15,
        message: 'Email không được vượt quá 15 ký tự'
      }
    },
    value: '',
    type: 'text'
  },
  {
    label: 'Mật khẩu',
    name: 'password',
    rules: {
      required: 'Mật khẩu không được để trống.',
      maxLength: {
        value: 15,
        message: 'Mật khẩu không được vượt quá 15 ký tự'
      }
    },
    value: '',
    type: 'password'
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
    value: 0,
    type: 'text'
  }
];
