import styled from 'styled-components';
import { NavLink } from 'react-router-dom'; //페이지 이동을 위한 라우터 임포트

export const StShopGuidePostWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  text-decoration: none;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: center;
  }
`;

export const StShopGuidePostContainer = styled(NavLink)`
  overflow: hidden;
  display: flex;
  color: black;
  text-decoration: none;
  border-bottom: 1px solid #e5e5e5;
  min-width: 100%;
  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: center;
  }
`;

export const StShopGuideTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
`;

export const StShopGuideBottom = styled.div`
  margin: 0px 20px 20px 20px;
`;

export const StShopGuidePostNumbering = styled.div`
  font-size: 15px;
  text-align: center;
  float: left;
  width: 100%;
  @media screen and (max-width: 800px) {
    display: none;
    justify-content: center;
  }
`;

export const StShopGuidePostTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0px;
  }
`;

export const StShopGuidePostInfo = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  margin: 13px 0px;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0px;
    padding: 10px;
  }
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
`;

export const StShopGuidePostUserPicture = styled.div`
  margin-right: 10px;
  @media screen and (max-width: 800px) {
    margin-bottom: 10px;
  }
`;

export const StShopGuidePostUserName = styled.div`
  margin-right: 10px;
  font-size: 13px;
  @media screen and (max-width: 800px) {
    margin-bottom: 10px;
  }
`;

export const StShopGuidePostDate = styled.div`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.4);
  @media screen and (max-width: 800px) {
    margin-bottom: 10px;
  }
`;

export const StShopGuidePostDescription = styled.div`
  color: rgba(0, 0, 0, 0.4);
  font-size: 13px;
  white-space: normal;
  line-height: 1.2;
  height: 45px;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
