import React from 'react';
import styled from 'styled-components';

// import nextId from "react-id-generator";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopGuide = () => {
  // useParams()를 통해 URL 파라미터를 가져올 수 있습니다.
  const param = useParams();
  // useNavigate()를 통해 페이지 이동을 할 수 있습니다.
  const navigate = useNavigate();
  // useSelector()를 통해 Redux의 상태를 가져올 수 있습니다. store에 있는 state를 구독합니다.
  const post_list = useSelector((state) => state.lists);

  return <div></div>;
};

export default ShopGuide;
