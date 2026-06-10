import { JobInfoWrapper, JobWrapper, JobLeft, JobRight, RowDivider, CoinBottons } from './styles.tables';
import { WebBody2MSolidGray400, WebHeadingH4Gray900 } from '@/utils/typography';

interface JobListTableProps {
    jobsPosted?: number;
    coinsLeft?: number;
}

export default function JobListTable({ jobsPosted = 0, coinsLeft = 0 }: JobListTableProps) {
    return (
        <>
        <JobInfoWrapper>
            <JobWrapper>
                <JobLeft>
                    <WebBody2MSolidGray400>Job Posted</WebBody2MSolidGray400>
                </JobLeft>
                <JobRight>
                    <WebHeadingH4Gray900>{jobsPosted}</WebHeadingH4Gray900>
                </JobRight>
            </JobWrapper>

            <RowDivider />

            <JobWrapper>
                <JobLeft>
                    <WebBody2MSolidGray400>Coin Left</WebBody2MSolidGray400>
                </JobLeft>
                <JobRight>
                    <WebHeadingH4Gray900>{coinsLeft}</WebHeadingH4Gray900>
                </JobRight>
            </JobWrapper>
        </JobInfoWrapper>
        <CoinBottons>Buy coins</CoinBottons>
        </>
    );
}
