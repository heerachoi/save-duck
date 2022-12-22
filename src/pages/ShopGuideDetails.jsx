import styled from 'styled-components';

const ShopGuideDetails = () => {
  return (
    <StShopDetailsContainer>
      <StShopDetailsArticle>
        <h3>게시글의 제목이 들어갑니다.</h3>
        {/* <DetailsImageContainer> */}
        <DetailsImage
          className='detailsMainImage'
          src='images/shop_guide_detail_image.jpg'
          alt='떡볶이 사진'
        />
        {/* </DetailsImageContainer> */}
        <div>게시글의 내용이 들어갑니다.</div>
      </StShopDetailsArticle>
    </StShopDetailsContainer>
  );
};

export default ShopGuideDetails;

const StShopDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StShopDetailsArticle = styled.div`
  text-align: center;
`;

const DetailsImage = styled.img`
  width: 500px;
`;
