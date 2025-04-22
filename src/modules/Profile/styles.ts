import { COLORS } from "@/utils/colors.util";
import styled from "@emotion/styled";


export const ProfileHeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    background: whitesmoke;
    padding-bottom: 30px;
`
export const ProfileHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 90%;
    height: 400px;
    margin-top: 50px;
    border-radius: 20px;
    overflow: hidden;

    @media screen and (max-width:790px){
        width: 90%;
    }
`

export const ProfileHeaderTitle = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 100%;
    height: 50%;
    border-bottom: 2px solid whitesmoke;
`
export const ProfileHeaderBase = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 100%;
    height: 50%;
    padding: 0 10px;
`
export const ImgContainer = styled.div`
    margin-bottom: 10px;
`
export const SettingsFlexContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 10px;
`
export const ProfileBotton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    border-radius: 20px;
    gap: 5px;
    background: ${COLORS.gray200};
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
`