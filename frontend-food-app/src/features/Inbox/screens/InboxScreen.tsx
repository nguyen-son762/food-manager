import LoadingSpinner from '@app/components/atoms/LoadingSpinner/LoadingSpinner';
import { ENV } from '@app/constants/env';
import { useAppSelector } from '@app/redux/store';
import { MessageDef } from '@app/types/atom.type';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Moment from 'react-moment';
import { Tooltip } from 'react-tippy';
import { io } from 'socket.io-client';
import { getRooms } from '../api/inbox.api';
import { RoomsResponseDef } from '../inbox';
import styles from './InboxScreen.module.scss';
const cx = classNames.bind(styles);

function ChatScreen() {
  const user = useAppSelector(state => state.auth.user);
  const [listRooms, setListRooms] = useState<RoomsResponseDef[] | null>(null);
  const [messages, setMessages] = useState<MessageDef[]>([]);
  const [roomIsChoose, setRoomIsChoose] = useState<RoomsResponseDef | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (user?._id) {
      getRooms(user?._id ?? '').then(data => {
        setListRooms(data.data.data);
        chooseRoom(data.data.data[0]);
        setIsLoading(false);
      });
    }
  }, [user?._id]);

  const renderRooms = () => {
    if (!listRooms || listRooms?.length < 1) {
      return null;
    }
    const result = listRooms?.map(room => {
      if (!user?._id) {
        return null;
      }
      const userInRoom = room.users.find(member => member._id !== user._id);
      return (
        <div
          className={cx(
            'rooms-item',
            roomIsChoose?._id === room._id ? 'active' : ''
          )}
          key={room._id}
          onClick={() => chooseRoom(room)}
        >
          <div>
            <img src={userInRoom?.avatar_url} className="rounded-full" alt="" />
          </div>
          <div className="text-[#B0B3B8]">
            <p>{userInRoom?.username}</p>
            <div className="flex">
              <p className="mr-2 text-ellipsis overflow-hidden whitespace-nowrap max-w-[13rem]">
                {room.messages[room.messages.length - 1].message.content}{' '}
              </p>{' '}
              · &nbsp;{' '}
              <Moment fromNow>
                {room.messages[room.messages.length - 1].message.createdAt}
              </Moment>
            </div>
          </div>
        </div>
      );
    });
    return result;
  };
  const renderMessages = () => {
    if (!messages || messages.length < 1) {
      return null;
    }
    const result = messages.map((item, index) => {
      const lines = item.content.split('/n');
      const content = lines.map((line, index) => {
        return (
          <span key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </span>
        );
      });
      return (
        <div
          key={index}
          className={cx(
            item.from === user?._id ? 'justify-end' : 'justify-start',
            'my-2 relative flex'
          )}
        >
          <Tooltip
            position="bottom-end"
            interactive
            theme="light"
            delay={1000}
            html={
              <div>
                <Moment format="LLLL">{item.createdAt}</Moment>
              </div>
            }
          >
            <p
              className={
                item.from === user?._id
                  ? styles.message_user
                  : styles.message_admin
              }
            >
              {content}
            </p>
          </Tooltip>
        </div>
      );
    });
    return result;
  };

  const chooseRoom = (room: RoomsResponseDef) => {
    setRoomIsChoose(room);
    setMessages(room.messages.map((item: any) => item.message));
    if (socket.current) {
      socket.current.removeListener('getMessage');
    }
    socket.current = io(ENV.HOST_SOCKET, {
      transports: ['websocket']
    });
    const localId = localStorage.getItem('id') || '';
    socket.current.emit('join', localId || '');
    socket.current.emit('addUser', localId || '');
    socket.current.on('getMessage', (data: any) => {
      console.log(data);
      if (data.room_id === room?._id) {
        setMessages(prev => [
          ...prev,
          {
            from: data.from,
            to: data.to,
            content: data.content,
            createdAt: data.createdAt,
            status: data.status
          }
        ]);
      }
    });
  };

  const messagesRef = useRef<any>();
  const inputChat = useRef<any>();
  const socket = useRef<any>();
  function autoGrow() {
    inputChat.current.style = '10px';
    inputChat.current.style.height = inputChat.current.scrollHeight + 'px';
  }
  const onKeyPressChatBox = async (e: any) => {
    if (e.shiftKey) {
      return true;
    }
    if (e.key == 'Enter') {
      e.preventDefault();
      if (!e.target.value.trim()) {
        return;
      }
      const content = e.target.value.replace(/\r?\n/g, '/n');
      socket.current.emit('sendMessage', {
        from: user?._id,
        to: roomIsChoose?.users.find(member => member._id !== user?._id)?._id,
        content
      });
      setMessages(prev => [
        ...prev,
        {
          from: user?._id || '',
          to:
            roomIsChoose?.users.find(member => member._id !== user?._id)?._id ||
            '',
          content,
          createdAt: new Date(),
          status: 1
        }
      ]);
      e.target.value = '';
    }
  };
  useEffect(() => {
    if (messagesRef?.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight + 50;
      inputChat.current.style = '10px';
    }
  }, [messages]);
  return (
    <section className="bg-dark min-h-[100vh] text-white px-8 flex">
      <div className={cx('rooms')}>
        <p className="text-3xl mb-6">Chat</p>
        <div className="flex-center">
          {isLoading && <LoadingSpinner primaryColor={true} size={40} />}
        </div>
        {renderRooms()}
      </div>
      <div className="messages bg-dark-second flex-1">
        <div
          className="flex items-center gap-2 px-5 py-4"
          style={{ borderBottom: '1px solid #2f3031' }}
        >
          <img
            src={
              roomIsChoose?.users.find(member => member._id !== user?._id)
                ?.avatar_url
            }
            className="rounded-full object-cover w-[3rem] h-[3rem]"
            alt=""
          />
          <p>
            {
              roomIsChoose?.users.find(member => member._id !== user?._id)
                ?.username
            }
          </p>
        </div>
        <div className="relative flex flex-grow flex-co">
          <div
            className={cx(
              'box-messages',
              'flex-1 overflow-y-auto px-4 py-3 custom-scrollbar pb-12'
            )}
            ref={messagesRef}
          >
            {renderMessages()}
          </div>
          <div className="absolute bottom-[-15px] pb-3 left-0 flex items-center w-full bg-dark-second pt-3">
            <textarea
              placeholder="Aa"
              ref={inputChat}
              className=" ml-3 flex-1 px-4 outline-none leading-5 py-2 bg-[#3a3b3c] rounded-xl resize-none min-h-[2.5rem] h-[2.5rem] max-h-[5rem] custom-scrollbar text-white"
              onInput={autoGrow}
              onKeyDown={e => {
                onKeyPressChatBox(e);
              }}
            />
            <button type="button">
              <span className="material-icons text-[#1A6ED8] mx-3 leading-7">
                send
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatScreen;
