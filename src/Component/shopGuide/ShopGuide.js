import styled from 'styled-components';
import { NavLink } from 'react-router-dom'; //페이지 이동을 위한 라우터 임포트

export const StShopGuidePostWrapper = styled.div`
  width: 70%;
  margin-top: 50px;
  border-bottom: 1px solid #e5e5e5;
  justify-content: left;
  text-decoration: none;
  margin-left: 70px;
  padding-bottom: 20px;
  cursor: pointer;
`;

export const StShopGuidePostContainer = styled(NavLink)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: black;
  text-decoration: none;
`;

export const StShopGuideTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
`;

export const StShopGuideBottom = styled.div`
  margin: 0px 0 20px 25px;
`;

export const StShopGuidePostNumbering = styled.div`
  font-size: 15px;
  margin-right: 20px;
`;

export const StShopGuidePostTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
`;

export const StShopGuidePostInfo = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 13px 0px;
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
`;

export const StShopGuidePostUserPicture = styled.div``;

export const StShopGuidePostUserName = styled.div`
  margin-right: 10px;
  font-size: 13px;
`;

export const StShopGuidePostDate = styled.div`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.4);
`;

export const StShopGuidePostDescription = styled.div`
  color: rgba(0, 0, 0, 0.4);
  font-size: 13px;
  white-space: normal;
  line-height: 1.2;
  height: 45px;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
