import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addpost } from '../redux/modules/list';
import nextId from 'react-id-generator';

// Form 컴포넌트를 생성 후 useState를 통해 lists 객체를 생성한다. lists 객체의 키값은 id,number, title, username,date, profilepicture, description 이다.
function Form() {
  const dispatch = useDispatch();
  const [lists, setLists] = useState({
    id: '',
    number: '',
    title: '',
    username: '',
    date: '',
    profilepicture: '',
    description: '',
  });

  // input 창의 value 값을 변경할 떄 마다 list 객체의 키값에 맞게 setList를 통해 값을 변경한다.
  const onChange = (e) => {
    const { name, value } = e.target;
    setLists({
      ...lists,
      [name]: value,
    });
  };

  // submit 버튼을 누르면 dispatch를 통해 addpost를 실행한다.
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addpost(lists));
    setLists({
      id: nextId(),
      number: '',
      title: '',
      username: '',
      date: '',
      profilepicture: '',
      description: '',
    });
  };
  return <div></div>;
}
