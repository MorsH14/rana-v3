import React from 'react'
import { EmogyContainer, MainReview, MyEmogy, ReactionContainer, ReactionImg, ReactionsContainer, ReviewAuthor, ReviewsContainer, ReviewsMainContainer } from './reviews.styles'
import { Box } from '@mui/material'
import { reactionsData, reviewsData } from '@/modules/Profile/db'
import { Font10016, Font50020, Font50030, Font70016, Font70032 } from '@/utils/typography'
import { COLORS } from '@/utils/colors.util'

export default function Rewiews() {
    return (
        <>
            <ReviewsContainer>
                <Font70032>
                    Reviews
                </Font70032>

                <ReactionsContainer>
                    <ReactionContainer>
                        <Font50020>
                            Reactions
                        </Font50020>
                        <EmogyContainer>
                            {reactionsData.map((reaction, index) => (
                                <MyEmogy key={index}>
                                    {reaction.emoji} {reaction.count}
                                </MyEmogy>
                            ))}
                        </EmogyContainer>
                    </ReactionContainer>

                    <ReviewsMainContainer>
                        <Font50030>
                            Reviews ({reviewsData.length})
                        </Font50030>
                        {reviewsData.map((review, index) => (
                            <MainReview key={index}>
                                <ReviewAuthor>
                                    <ReactionImg src={review.imgSrc} alt="Author" />
                                    <Font70016>
                                        {review.author}
                                    </Font70016>
                                </ReviewAuthor>
                                    <Box
                                        sx={{
                                            width: "90%",
                                            background: "whitesmoke",
                                            borderRadius: "20px",
                                            minHeight: "20px",
                                            padding: "10px",
                                            color: COLORS.gray100,
                                            marginLeft: '30px'
                                        }}>
                                        <Font10016>
                                            {review.comment}
                                        </Font10016>
                                    </Box>
                            </MainReview>
                        ))}
                    </ReviewsMainContainer>
                </ReactionsContainer>
            </ReviewsContainer>
        </>
    )
}
