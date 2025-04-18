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
`
export const ImgContainer = styled.div`
    margin-bottom: 10px;
`
export const SettingsFlexContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`
export const ProfileBotton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    border-radius: 20px;
    gap: 5px;
    background: whitesmoke;
    cursor: pointer;
    font-family: 'Sulphur Point';
    font-size: 14px;
    font-weight: bold;
`
export const JobProfileContainer = styled.div`
    margin: 50px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    width: 90%;
    
    @media screen and (max-width:790px){
        width: 90%;
    }
`

export const JobProfileHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 30px;
`

export const JobProfileContainerList = styled.div`
    display: flex;
    gap: 10px;
    overflow-x: auto; /* Ensure auto-scrolling is enabled */
    width: 100%;
    width: 100%; /* Ensure there's enough content for scrolling */

    &::-webkit-scrollbar {
        display: none; /* Hides scrollbar for webkit-based browsers (Chrome, Safari) */
    }

    -ms-overflow-style: none;  /* Hide scrollbar for Internet Explorer and Edge */
    scrollbar-width: none;  /* Hide scrollbar for Firefox */
`

export const JobProfileList = styled.div`
    width: 330px;
    height: 330px;
    border-radius: 30px;
    background: blueviolet;
    color: whitesmoke;
    padding: 20px;
    margin: 10px 0;
    flex-shrink: 0; /* Prevent shrinking */

    @media screen and (max-width:790px){
        width: 250px;
    }
`

export const JobListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    width: 100%;
    flex-wrap: wrap;
`

export const JobLogo = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #615a5a45;
`

export const SkillSet = styled.div`
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    height: 50px ;
    overflow: hidden;
    margin-bottom: 10px;

    @media screen and (max-width:790px){
        height: 25px;
        overflow: hidden;
    }
    
`

export const Skill = styled.div`
    background: #615a5a45;
    border-radius: 20px;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    white-space: nowrap; /* Prevent text from wrapping */
    min-width: 60px; /* Ensure minimum width to avoid shrinking */
`
export const ReviewsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    width: 90%;

    @media screen and (max-width:790px){
        width: 90%;
    }
`
export const ReactionsContainer = styled.div`
    width: 50%;
    min-height: 400px;
    border-radius: 30px;
    margin-top: 20px;
    width: 100%;
    background: white;
`
export const ReactionContainer = styled.div`
    height: 120px;
    border-bottom: 3px solid whitesmoke;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
`
export const EmogyContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
`
export const MyEmogy = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 14px;
`

export const ReviewsMainContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    flex-direction: column;
    padding: 20px;
`
export const MainReview = styled.div`
    flex-direction: column;
    gap: 10px;
`
export const ReviewAuthor = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
`
export const ReactionImg = styled.img`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    object-fit: cover;
`
export const TypographyComment = styled.div`
    margin-left: 30px;
`