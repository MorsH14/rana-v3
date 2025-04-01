import styled from "@emotion/styled";


export const RoundedBtnWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #6e65659d;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const Button = styled.button`
    background: white;
    font-size: 10px;
    font-weight: bold;
    color: #464444;
    border-radius: 20px;
    border: none;
    font-family: 'Sulphur Point';

    @media screen and (min-width: 681px) {
        font-size: 14px;
    }
    `