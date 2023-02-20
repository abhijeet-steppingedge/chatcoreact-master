import React from 'react'
import styled, { css } from 'styled-components'

export const CardContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: calc(100% - 20px);
  margin: 10px;
  border-radius: 18px;
  overflow: hidden;
  cursor: normal;
  position: relative;
  box-sizing: border-box;
  height: fit-content;
  background: ${({ soldOut }) => soldOut ? 'rgb(25 25 25 / 20%)' : '#f9f9f9'};

  &:hover {
    box-shadow:0 3px 12px #4040491a;
  }
  @media (min-width: 768px) {
    width: calc(50% - 20px);
  }
  @media (min-width: 1024px) {
    width: calc(100% - 20px);
    height:fit-content;
  }
  @media (min-width: 1250px) {
    width: calc(50% - 20px);
    height:fit-content;
  }
`

export const SoldOut = styled.span`
  font-weight: bold;
  position: absolute;
  border-radius: 23px;
  padding: 5px 10px;
  color: #FFF;
  top: 5px;
  left: 6px;
  text-transform: uppercase;
  font-size: 14px;
  ${props => props.theme?.rtl && css`
    right: 6px;
    right: initial;
  `}
`

export const CardInfo = styled.div`
  justify-content: left;
  padding: 0px 0;
  box-sizing: border-box;
  max-width: calc(100% - 140px);

  ${({ noImage }) => noImage && css`
    max-width: 100%;
  `}
  > * {
    margin: 5px;
    ${props => props.theme?.rtl ? css`
      margin-right: 10px;
    ` : css`
      margin-left: 10px;
    `}
  }

  h1 {
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    color: #263238;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${props => props.theme?.rtl && css`
      text-align: right;
    `}
  }

  p {
    font-weight: 200;
    text-align: left;
    color: ${props => props.theme.colors?.darkGray};
    ${props => props.theme?.rtl && css`
      text-align: right;
    `}
    overflow: hidden;
  }

  span {
    color: ${props => props.theme.colors?.darkGray};
    font-weight: bold;
  }

  p, span {
    font-size: 16px;
  }
`

export const WrapLogo = styled.div`
max-width: 110px;
max-height: 100px;
height: 100px;
width: 110px;

  @media (min-width: 1200px) {
    max-width: 120px;
    max-height: 120px;
    height: 120px;
    width: 120px;
  }
`

const CardLogoStyled = styled.div`
  box-sizing: border-box;
  position: relative;
  background-repeat: no-repeat, repeat;
  background-size: cover;
  background-position: center;
  object-fit: cover;
  width:85%;
  min-height:70%;
  margin:14% 7% 0px;
  border-radius:10%;
  box-shadow:${props => props.hasImages ? '0 3px 12px #44465030' : ''};
`
export const CardLogo = (props) => {
  const style = {}
  if (props.bgimage) {
    style.backgroundImage = `url(${props.bgimage})`
  }
  if (props.soldOut) {
    style.filter = 'brightness(70%)'
  }
  return (
    <CardLogoStyled {...props} style={style}>
      {props.children}
    </CardLogoStyled>
  )
}
