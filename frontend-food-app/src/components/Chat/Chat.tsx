import { ENV } from '@app/constants/env';
import { memo, useEffect, useRef, useState } from 'react';
import styles from './Chat.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '@app/redux/store';
import { MessageDef } from '@app/types/atom.type';
import { io } from 'socket.io-client';
import { getAdmin } from '@app/features/auth/api/auth.api';
import { UserDef } from '@app/features/auth/auth';
import { getMessagesByUSer } from '@app/api/message.api';
import { Tooltip } from 'react-tippy';
import Moment from 'react-moment';

function Chat() {
  const [isShowBoxChat, setIsShowBoxChat] = useState(false);
  const user = useAppSelector(state => state.auth.user);
  const [messages, setMessages] = useState<MessageDef[]>([]);
  const [idUser, setIdUser] = useState('');
  const [admin, setAdmin] = useState<UserDef | null>(null);
  const inputChat = useRef<any>();
  const socket = useRef<any>();

  function auto_grow() {
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
        from: idUser,
        to: admin?._id,
        content
      });
      setMessages(prev => [
        ...prev,
        {
          from: idUser || '',
          to: admin?._id || '',
          content,
          createdAt: new Date(),
          status: 1
        }
      ]);
      e.target.value = '';
    }
  };
  const renderMessages = () => {
    const result = messages.map((item, index) => {
      const lines = item.content.split('/n');
      const content = lines.map((line, index) => {
        return (
          <p key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </p>
        );
      });
      return (
        <div key={index} className="my-2 relative">
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
            <div
              className={
                item.from === user?._id
                  ? styles.message_user
                  : styles.message_admin
              }
            >
              {content}
            </div>
          </Tooltip>
        </div>
      );
    });
    return result;
  };
  const messagesRef = useRef<any>();

  useEffect(() => {
    // scroll to bottom after message changed
    socket.current = io(ENV.HOST_SOCKET, {
      reconnectionDelayMax: 10000
    });
    const localId = localStorage.getItem('id') || '';
    const id = uuidv4();
    if (user?._id || localId) {
      setIdUser(user?._id || localId);
    } else {
      setIdUser(id);
    }
    socket.current.emit('join', localId || id);
    socket.current.emit('addUser', localId || id);
    socket.current.on('getMessage', (data: any) => {
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
    });
    getAdmin().then(data => {
      setAdmin(data.data.user);
      getAllMessages();
    });
    return () => {
      socket.current.removeListener('getMessage');
    };
  }, []);
  useEffect(() => {
    if (messagesRef?.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight + 50;
      inputChat.current.style = '10px';
    }
  }, [messages, isShowBoxChat]);

  const getAllMessages = async () => {
    const localId = localStorage.getItem('id') || '';
    const data = await getMessagesByUSer(localId || idUser);
    const result = data.data.data.map((item: any) => {
      return item.message;
    });
    setMessages(result);
  };
  return (
    <div className="bg-white fixed bottom-10 right-10 flex-center rounded-full w-[3.5rem] h-[3.5rem]">
      <img
        src={ENV.URL_IMAGE_DEFAULT}
        alt=""
        className="cursor-pointer w-full h-full rounded-full object-cover"
        onClick={() => setIsShowBoxChat(!isShowBoxChat)}
      />
      <span className="absolute right-[-0.5rem] top-0 w-[1.5rem] h-[1.5rem] rounded-full bg-primary flex-center text-white">
        1
      </span>
      {isShowBoxChat && (
        <div className="absolute bottom-[95%] right-[95%] h-[25rem] w-[20rem] bg-[#242526] rounded-xl overflow-hidden flex flex-col">
          <div className={styles.title_chat}>
            <div className="flex items-center">
              <img
                src={ENV.URL_IMAGE_DEFAULT}
                className="rounded-full w-[3rem] h-[3rem] mr-2"
                alt=""
              />
              <p className="text-white">Admin</p>
            </div>
            <div className="flex items-center">
              <span
                className="flex-center material-icons-outlined mr-2 cursor-pointer text-[#666768] w-[1.5rem] h-[1.5rem] rounded-full bg-transparent hover:bg-[#3E4042]"
                onClick={() => setIsShowBoxChat(false)}
              >
                remove
              </span>
            </div>
          </div>
          <div className="relative flex flex-grow flex-col">
            <div
              className="flex-1 overflow-y-auto px-4 py-3 max-h-[300px] box-messages"
              ref={messagesRef}
            >
              {renderMessages()}
            </div>
            <div className="absolute bottom-0 left-0 flex items-center mb-3 w-full">
              <textarea
                placeholder="Aa"
                ref={inputChat}
                className=" ml-3 flex-1 px-4 outline-none leading-5 py-2 bg-[#3a3b3c] rounded-xl resize-none min-h-[2.5rem] h-[2.5rem] max-h-[5rem] custom-scrollbar text-white"
                onInput={auto_grow}
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
      )}
    </div>
  );
}

export default memo(Chat);
