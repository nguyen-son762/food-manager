import { enumOrder } from '../orders';

export const ButtonsOrder = [
  {
    type: enumOrder.COMPLETED,
    background: '#456465',
    color: '#50D1AA',
    label: 'Đã thanh toán'
  },
  {
    type: enumOrder.CANCELLED,
    background: '#4D1A23',
    color: '#9D0505',
    label: 'Đã hủy'
  },
  {
    type: enumOrder.ORDERED,
    background: '#30405C',
    color: '#65B0F6',
    label: 'Đã đặt'
  },
  {
    type: enumOrder.PENDING,
    background: '#4C3B39',
    color: '#FFB572',
    label: 'Đang chờ'
  },
  {
    type: enumOrder.PREPARING,
    background: '#363455',
    color: '#9290FE',
    label: 'Đang chuẩn bị'
  }
];
