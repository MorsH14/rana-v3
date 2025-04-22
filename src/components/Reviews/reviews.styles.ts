import styled from "@emotion/styled"

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