import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux"; //useSelector 훅 임포트, state값을 조회한다

function List() {

    const listStore = useSelector((state) => state.lists); // useSelector 훅을 통해 state값을 조회한다.


    return (
        <div>
            {
                listStore.map((lists) => {
                    return (

                        <StShopGuidePostContainer>
                            <StShopGuideTop>
                                <StShopGuidePostNumbering>
                                    <span>{lists.id}</span>
                                </StShopGuidePostNumbering>
                                <StShopGuidePostTitle>
                                    <span>{lists.title}</span>
                                </StShopGuidePostTitle>
                            </StShopGuideTop>
                            <StShopGuidePostInfo>
                                <StShopGuidePostUserPicture>
                                </StShopGuidePostUserPicture>
                                <StShopGuidePostUserName>
                                    <span>{lists.username}</span>
                                </StShopGuidePostUserName>
                                <StShopGuidePostDate>
                                    <span>{lists.date}</span>
                                </StShopGuidePostDate>
                            </StShopGuidePostInfo>
                            <StShopGuidePostDescription>
                                <span>{lists.description}</span>
                            </StShopGuidePostDescription>
                        </StShopGuidePostContainer>

                    )
                }
                )
            }
        </div>
    );
}

export default List;

const StShopGuidePostContainer = styled.div`
margin : 25px 100px 15px 100px;
`;

const StShopGuideTop = styled.div`
height : 20px;
display: flex;
flex-direction: row;

`;
const StShopGuidePostNumbering = styled.div`
width : 50px;

font-size : 12px;
`;
const StShopGuidePostTitle = styled.div`
height : 20px;
width : 700px;
font-size : 12px;
font-weight : 600;
  `;

const StShopGuidePostInfo = styled.div`
height : 20px;
display: flex;
flex-direction: row;
margin-left : 55px;
  `;

const StShopGuidePostUserPicture = styled.div`
width : 20px;
height : 20px;
  `;
const StShopGuidePostUserName = styled.div`
width : 8rem;
font-size : 11px;
display: flex;
align-items: center;
color : coral;
  `;
const StShopGuidePostDate = styled.div`
width : 8rem;
font-size : 9px;
color : gray;
display: flex;
align-items: center;
  `;
const StShopGuidePostDescription = styled.div`
font-size : 11px;
color : gray;
margin-left : 50px;
  `;