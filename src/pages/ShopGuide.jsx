import styled from "styled-components";

const ShopGuide = () => {
  return (
    <StShopGuideContainer>
      <StShopGuideHeader>
        <StShopGuideHeaderLeft>
          <h1> Shopping Guide</h1>
        </StShopGuideHeaderLeft>
      </StShopGuideHeader>
    </StShopGuideContainer>


  )
};

const StShopGuideContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StShopGuideHeader = styled.div`
  color: black;
  font-size: 1rem;
  `;

const StShopGuideHeaderLeft = styled.div`
  `;

export default ShopGuide;
