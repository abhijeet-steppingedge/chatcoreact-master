import React from 'react'
import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    width: 100%;
    flex-direction: row;
  }
`

export const ProductsContainer = styled.div`
  width: 100%;
  padding: 0px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;

  @media (min-width: 1024px) {
    width: calc(100% - 450px);
    padding: 0px 15px;
  }
`

export const BusinessCartContainer = styled.div`
  width: 100%;
  padding: 0px 5px 30px 0px;
  box-sizing: border-box;

  ${props => props.theme?.rtl && css`
    padding: 0px 20px 30px 10px;
  `}

  @media (min-width: 1024px) {
    width: 450px;
    border-top: none;
    ${props => props.theme?.rtl ? css`
      border-right: 1px solid #CCC;
    ` : css`
      border-left: 1px solid #CCC;
    `}
  }
`

export const BusinessCartInnerContainer = styled.div`
  position: sticky;
  top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  > div.cart {
    border-bottom: none;
    width: 100%;
    box-sizing: border-box;

    > div {
      box-shadow: none;
    }
  }

  img {
    width: 200px;
  }

  > span {
    width: 100%;
  }

  p {
    color: ${props => props.theme.colors?.darkGray};
    margin: 0px 0;
  }

  @media (min-width: 1024px) {
    max-height: calc(100vh - 60px);
    overflow: auto;
  }
`

export const WrapContent = styled.div`
  padding: 5px;
  background: ${props => props.theme.colors.backgroundPage};

  @media (min-width: 381px) {
    padding: 0px;
  }
`

export const WrapperSearch = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  width: 100%;
  margin-top:10px;
  > div:first-child {
    ${props => props.theme?.rtl ? css`
      margin-left: 15px;
    ` : css`
      margin-right: 15px;
    `}
  }

  input{
    height: 34px;
  }
  .search-bar {
    width:80%;
    margin-right: 10px;
    height: 34px !important;
    ${props => props.theme?.rtl && css`
      margin-left: 10px;
      margin-right: 0;
    `}
  }

  @media (min-width: 768px) {
    /* width: inherit; */
  }
`

export const ProductsNotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: calc(100vh - 45px);
  margin: auto;

  h1 {
    font-size: 20px;
    opacity: 0.5;
    text-align: center;
  }

  @media (min-width: 411px) {
    h1 {
      font-size: 24px;
    }
  }
`

export const ProductLoading = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const SkeletonItem = styled.div`
  width: 80%;
  margin: 30px auto;

  span {
    margin-bottom: 10px;
  }
`

export const WrappLayout = styled.div`
  max-width: 1200px;
  width: 100%;
  ${({ isCartOnProductsList }) => isCartOnProductsList && css`
    display: flex;
    flex-direction: column;

    .bp-list,
    .cart {
      width: 100%;
    }

    @media (min-width: 870px) {
      flex-direction: row;
      .bp-list {
        width: 55%;
      }
      .cart {
        width: calc(45% - 20px);
        margin-left: 20px;
      }
    }

    @media (min-width: 1024px) {
      .bp-list {
        width: 60%;
      }
      .cart {
        width: calc(40% - 20px);
      }
    }

    @media (min-width: 1200px) {
      .bp-list {
        width: 70%;
      }
      .cart {
        width: calc(30% - 20px);
      }
    }
  `}
`

export const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-end;
  margin: 0px;
`

export const DeliveryInfo = styled.div`
  border: 1px solid #E7E7E7;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 0px 0;
  display: flex;
  width: 100%;
  max-width: 520px;
  min-width: 300px;
  ${({ isDelivery }) => !isDelivery && css`
    max-width: 370px;
    min-width: 310px;
  `}
  box-sizing: border-box;
  ${props => props.theme?.rtl ? css`
    margin-left: 10px;
  ` : css`
    margin-right: 10px;
  `}
`

export const DeliveryTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  background-color:#ffffff9c;
  h2,
  p {
    margin: 0px;
  }

  h2 {
    font-size: 16px;
  }

  p {
    font-size: 14px;
  text-align: center;
    color: ${props => props.theme.colors.darkGray};
  }
  @media (max-width: 490px) {
    h2 {
      font-size: 11px;
    }
    p {
      font-size: 11px;
    }
  }
`
export const Preorder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  width: 106%;
  border-left: 1px solid #E7E7E7;
  background-color:#ffffff9c;
  h2,
  p {
    margin: 0px;
  }

  h2 {
    font-size: 14px;
    svg{
      display:none;
    }
  }

  p {
    font-size: 13px;
  text-align: center;
    color: ${props => props.theme.colors.darkGray};
  }
  @media (max-width: 490px) {
    h2 {
      font-size: 9px;
    }
    p {
      font-size: 12px;
    }
  }
`

export const DeliveryPrice = styled(DeliveryTime)`
  width: 54%;
  background-color:#ffffff9c;
  ${props => props.theme?.rtl ? css`
    border-left: 1px solid #E7E7E7;
  ` : css`
    border-right: 1px solid #E7E7E7;
  `}
  @media (max-width: 490px) {
    h2 {
      font-size: 11px;
    }
    p {
      font-size: 11px;
    }
  }
`

export const ToTitle = styled.span`
  color: #191919;
  text-transform: lowercase;
  ${({ home }) => home && css`
    color: #FFF;
  `}
`
export const BusinessHeader = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  max-height: 170px;
  height: 170px;
  background-repeat: no-repeat, repeat;
  background-size: cover;
  object-fit: cover;
  background-position: center;
  min-height: 170px;
  justify-content: center;
  align-items: flex-end;
  border-radius: 5px;

  ${props => props.isSkeleton && css`
    background-color: #F8F8F8;
  `}

  ${props => props.bgimage && !props.isClosed && css`
    background-image: url(${props.bgimage});
  `}

  ${props => props.bgimage && props.isClosed && css`
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props.bgimage});
  `}

  h1 {
    color: #FFF;
    opacity: 0.5;
    position: absolute;
    top: 0;
    right: 0;
    margin: 0 10px;
    padding: 0;
  }

  @media (min-width: 490px) {
    justify-content: flex-start;
  }

  @media (min-width: 768px) {
    max-height: 180px;
    height: 180px;
  }
`

export const WrapperBusinessLogo = styled.div`
  max-width: 60px;
  max-height: 45px;
  height: 45px;
  width: 60px;
  ${props => props.theme?.rtl ? css`
    right: 25px;
  ` : css`
    left: 25px;
  `}

  span {
    border-radius: 15%;
  }

  @media (min-width: 768px) {
    ${props => props.theme?.rtl ? css`
      right: 45px;
    ` : css`
      left: 45px;
    `}
  }
`

export const BusinessLogo = (props) => {
  const style = {}
  if (props.bgimage) {
    style.backgroundImage = `url(${props.bgimage})`
  }
  return (
    <BusinessLogoStyled {...props} style={style}>
      {props.children}
    </BusinessLogoStyled>
  )
}

const BusinessLogoStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  background-repeat: no-repeat, repeat;
  background-size: cover;
  object-fit: cover;
  background-position: center;
  min-height: 45px;
  border-radius: 15%;
  box-shadow: 0px 3px 6px #00000029;
  margin-top:10px;
  @media (min-width: 900px) {
    margin-top:0px;
  }
`

export const BusinessContent = styled.div`
  display: flex;
  flex-direction:row;
  background-color: #FFF;
  border-radius: 10px;
  padding: 10px 10px;
  max-height: 90px;
  width:70%;
`
export const BusinessInfo = styled.div`
  display: flex;
  width: 100%;
`

export const BusinessInfoItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${props => props.theme?.rtl && css`
    padding: 0px 16px 0px 5px;
  `}

  div {
    font-size: 14px;
    display: flex;

    span {
      margin: 0 5px;
    }

    h5 {
      font-weight: 300;
      svg{
        margin-bottom: 1px;
      }
    }

    h5,
    p {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin: 5px;
      overflow: hidden;
      /* white-space: nowrap; */
      text-overflow: ellipsis;
      color: ${props => props.theme.colors.darkGray};

      svg {
        margin-right: 4px;

        ${props => props.theme?.rtl && css`
          margin-left: 4px;
          margin-right: 0px;
        `}

        &.popup {
          color: ${props => props.theme.colors.primary};
          cursor: pointer;
          transform: rotate(180deg);
        }
      }

      &.bold {
        font-weight: 600;
        font-size: 4vw;
        color: #191919;
      }


  @media (min-width: 900px) {
    &.bold {
      font-weight: 600;
      font-size: 23px;
      color: #191919;
    }
  }

      &.type {
        font-weight: 300;
      }

      ${props => props.theme?.rtl ? css`
        margin-left: 15px;
      ` : css`
        margin-right: 15px;
      `}
    }

    @media (min-width: 481px) {
      font-size: 16px;
      width: 100%;
    }
    @media (min-width: 768px) {
      font-size: 11px;
      width: 100%;
    }
    @media (min-width: 1024px) {
      font-size: 13px;
      width: 100%;
    }
  }
`


export const FormInput = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  input.form {
    padding: 10px 15px;
    width: 100%;
    margin-bottom: 20px;
    box-sizing: border-box;
    &:disabled {
      background-color: rgba(239, 239, 239, 0.3);
      cursor: not-allowed;
    }
  }
  button {
    width: 100%;
    padding: 7px 0;
  }
  @media (min-width: 769px) {
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    input.form {
      width: 49%;
    }
  }
`

export const ActionsForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  button {
    flex: 1;
    margin-top: 10px;
    padding: 7px 0px;
    width: 49%;
    box-sizing: border-box;

    &:disabled {
      cursor: not-allowed;
    }

    &:nth-child(2) {
      margin-left: 10px;
    }
  }

  ${props => props.theme?.rtl && css`
    button {
      &:nth-child(1) {
        margin-right: 0px;
      }
      &:last-child {
        margin-right: 5px;
      }
    }
  `}
`

export const TrackOrderSection = styled.div`
width: 20%;

margin: 10px;
cursor: pointer;
font-size:4vw;
font-weight: 500;

@media (min-width: 425px) {
  margin: 20px;
  font-size:17px;
}
`