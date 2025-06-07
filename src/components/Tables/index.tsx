import { JobInfoWrapper, JobWrapper, JobLeft, JobRight, RowDivider } from './styles.tables';
import { WebBody2MSolidGray400, WebHeadingH4Gray900 } from '@/utils/typography';

export default function JobListTable() {
    return (
        <JobInfoWrapper>
            <JobWrapper>
                <JobLeft>
                    <WebBody2MSolidGray400>Job Posted</WebBody2MSolidGray400>
                </JobLeft>
                <JobRight>
                    <WebHeadingH4Gray900>12</WebHeadingH4Gray900>
                </JobRight>
            </JobWrapper>

            <RowDivider />

            <JobWrapper>
                <JobLeft>
                    <WebBody2MSolidGray400>Coin Left</WebBody2MSolidGray400>
                </JobLeft>
                <JobRight>
                    <WebHeadingH4Gray900>300</WebHeadingH4Gray900>
                </JobRight>
            </JobWrapper>
        </JobInfoWrapper>
    );
}
