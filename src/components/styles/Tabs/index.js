import styled, { css } from 'styled-components'

export const Tabs = styled.div`
  display: flex;
  ${({ variant }) => variant === 'primary' && css`
    color: ${props => props.theme.colors.darkTextColor};
  `}

`

export const Tab = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  ${({ active }) => active && css`
    ${({ borderBottom }) => borderBottom && css`
      border-bottom: 3px solid;
    `}
  `}

  ${({ active }) => !active && css`
  color: ${props => props.theme.colors.primary};
  `}
`
export const CategoriesTab = styled.div`
.current-class {
  background-color:${props => props.theme.colors.primary};
  color: white;
  box-shadow:0 3px 11px #f6632840;
}
margin:0px;
  padding: 4px 12px;
  cursor: pointer;
  border-radius:60px;
  ${({ active }) => active && css`
  color: white;
  background-color:${props => props.theme.colors.primary};
  box-shadow:0 3px 11px #f6632840;
    ${({ borderBottom }) => borderBottom && css`
      border-bottom: 3px solid;
    `}
  `}

  ${({ active }) => !active && css`
  color:black;
  background-color:white;
  `}
  &:hover {
    background-color:${props => props.theme.colors.primary};
    color: white;
    box-shadow:0 3px 11px #f6632840;
  }
`

export const CategoriesTabs = styled.div`
  display: flex;
  ${({ variant }) => variant === 'primary' && css`
    color: ${props => props.theme.colors.darkTextColor};
  `}

`
