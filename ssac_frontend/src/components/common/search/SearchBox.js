import React from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBlock = styled.div`
  // display: none;
  position: relative;
  margin-right: 1rem;
`;

const NavSearchRoundBox = styled.div`
  border: 1px solid #555555;
  padding: 0.1rem 0;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-left: 10rem;
`;

const NavSearchInput = styled.input`
  flex: 1;
  border: none;
  width: 13rem;

  &:focus {
    outline: none;
  }
`;

const SearchResultBlock = styled.div`
  width: 100%;
  height: 15rem;
  position: absolute;
  top: 3.5rem;
  box-shadow: 0 0.4rem 0.8rem 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #dedede;
  background: #fff;
`;

const SearchResultWrapper = styled.div`
  padding: 1rem;
  cursor: pointer;
  & + & {
    border-top: 1px solid #dedede;
  }
`;

const SearchResult = styled.div`
  font-size: 1.3rem;
  font-weight: normal;
`;

const NavStyledIcon = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #555555;

  & + & {
    margin-left: 1rem;
  }
`;
function SearchBox(
  searchInfo,
  onChangeInput,
  searchState,
  searchData,
  onClickAutoComplete
) {
  return (
    <SearchBlock>
      <NavSearchRoundBox>
        <NavSearchInput
          name="search"
          value={searchInfo.search}
          onChange={onChangeInput}
        />
        <NavStyledIcon>
          <AiOutlineSearch />
        </NavStyledIcon>
      </NavSearchRoundBox>
      {searchState ? (
        <>
          <SearchResultBlock>
            {searchData.map((item, idx) => (
              <SearchResultWrapper
                key={idx}
                onClick={() => onClickAutoComplete(item.title)}
              >
                <SearchResult
                  dangerouslySetInnerHTML={{ __html: item.title }}
                ></SearchResult>
              </SearchResultWrapper>
            ))}
          </SearchResultBlock>
        </>
      ) : (
        <></>
      )}
    </SearchBlock>
  );
}

export default SearchBox;
