"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import {
  Plus,
  Briefcase,
  Coins,
  ChatCircle,
  ArrowRight,
  MapPin,
  CalendarBlank,
} from "@phosphor-icons/react/dist/ssr";
import { COLORS } from "@/utils/colors.util";
import { useLocalStorage } from "@/utils/hooks/useLocalStorage";
import { initialUserData, messagesData } from "@/db";

/* ─── types ─── */

type PostedJob = {
  id: string;
  company: string;
  role: string;
  date: string;
  salary: string;
  salaryValue: number;
  location: string;
  logo: string;
  category: string;
  description: string;
  chips: string[];
  rating?: number;
  reviewCount?: number;
};

/* ─── styled components ─── */

const Page = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 28px 16px 100px;

  @media screen and (min-width: 768px) {
    padding: 36px 24px 80px;
  }
`;

const Hero = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
`;

const Avatar = styled.div<{ bg: string }>`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
`;

const Greeting = styled.div`
  font-family: Inter, sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
  line-height: 1.25;
`;

const Sub = styled.div`
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: ${COLORS.SolidGray400};
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  background: ${COLORS.NeutralSolid0};
  border: 1px solid ${COLORS.NeutralSolid50};
  border-radius: 14px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const StatIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: white;
  border: 1px solid ${COLORS.NeutralSolid50};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatNum = styled.div`
  font-family: Inter, sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
  line-height: 1;
`;

const StatLabel = styled.div`
  font-family: Inter, sans-serif;
  font-size: 11px;
  color: ${COLORS.SolidGray400};
  font-weight: 500;
`;

const PostCTA = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${COLORS.NeutralSolidGray900};
  color: white;
  border-radius: 14px;
  padding: 16px 18px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 28px;
  transition: opacity 0.15s;

  span {
    flex: 1;
  }

  &:hover {
    opacity: 0.88;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const SectionTitle = styled.div`
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
`;

const SectionCount = styled.div`
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: ${COLORS.SolidGray400};
  background: ${COLORS.NeutralSolid50};
  border-radius: 99px;
  padding: 2px 10px;
`;

const ListingCard = styled.div`
  background: white;
  border: 1px solid ${COLORS.NeutralSolid50};
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 10px;
  transition: box-shadow 0.15s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
  }
`;

const ListingTitle = styled.div`
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${COLORS.NeutralSolidGray900};
  margin-bottom: 4px;
`;

const ListingMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: Inter, sans-serif;
  font-size: 12px;
  color: ${COLORS.SolidGray400};
  margin-bottom: 10px;

  span {
    display: flex;
    align-items: center;
    gap: 3px;
  }
`;

const ListingSalary = styled.div`
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: ${COLORS.NeutralSolidGray900};
  margin-bottom: 8px;
`;

const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Chip = styled.div`
  font-family: Inter, sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: ${COLORS.SolidGray700};
  background: ${COLORS.NeutralSolid25};
  border: 1px solid ${COLORS.NeutralSolid50};
  border-radius: 99px;
  padding: 3px 10px;
`;

const EmptyBox = styled.div`
  border: 2px dashed ${COLORS.NeutralSolid50};
  border-radius: 16px;
  padding: 40px 24px;
  text-align: center;
`;

const EmptyTitle = styled.div`
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${COLORS.NeutralSolidGray900};
  margin-bottom: 6px;
`;

const EmptyText = styled.div`
  font-family: Inter, sans-serif;
  font-size: 13px;
  color: ${COLORS.SolidGray400};
  margin-bottom: 16px;
  line-height: 1.5;
`;

const EmptyBtn = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 18px;
  background: ${COLORS.NeutralSolidGray900};
  color: white;
  border-radius: 99px;
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

/* ─── constants ─── */

const AVATAR_COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#e11d48"];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

/* ─── component ─── */

export default function HomeWorker() {
  const [user] = useLocalStorage("rana-user-profile", initialUserData);
  const [postedJobs] = useLocalStorage<PostedJob[]>("rana-posted-jobs", []);

  const avatarColor = AVATAR_COLORS[user.name.charCodeAt(0) % AVATAR_COLORS.length];
  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const firstName = user.name.split(" ")[0];
  const city = user.location.split(",")[0].trim();
  const enquiryCount = messagesData.length;

  return (
    <Page>
      {/* Greeting */}
      <Hero>
        <Avatar bg={avatarColor}>{initials}</Avatar>
        <div>
          <Greeting>
            {getGreeting()}, {firstName} 👋
          </Greeting>
          <Sub>
            {user.role && <>{user.role} · </>}
            <MapPin size={12} weight="fill" color={COLORS.Blue500} />
            {city}
          </Sub>
        </div>
      </Hero>

      {/* Stats */}
      <StatsRow>
        <StatCard>
          <StatIcon>
            <Briefcase size={16} weight="fill" color={COLORS.Blue500} />
          </StatIcon>
          <StatNum>{user.jobsPosted}</StatNum>
          <StatLabel>Listings</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>
            <Coins size={16} weight="fill" color="#f59e0b" />
          </StatIcon>
          <StatNum>{user.coinsLeft}</StatNum>
          <StatLabel>Coins</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>
            <ChatCircle size={16} weight="fill" color={COLORS.Green100} />
          </StatIcon>
          <StatNum>{enquiryCount}</StatNum>
          <StatLabel>Enquiries</StatLabel>
        </StatCard>
      </StatsRow>

      {/* Post CTA */}
      <Link href="/post-job" style={{ textDecoration: "none" }}>
        <PostCTA>
          <Plus size={18} weight="bold" />
          <span>Post a new service</span>
          <ArrowRight size={16} weight="bold" />
        </PostCTA>
      </Link>

      {/* Active listings */}
      <SectionHeader>
        <SectionTitle>My Active Listings</SectionTitle>
        {postedJobs.length > 0 && (
          <SectionCount>{postedJobs.length}</SectionCount>
        )}
      </SectionHeader>

      {postedJobs.length === 0 ? (
        <EmptyBox>
          <EmptyTitle>No listings yet</EmptyTitle>
          <EmptyText>
            Post your first service and start receiving enquiries from clients near you.
          </EmptyText>
          <Link href="/post-job" style={{ textDecoration: "none" }}>
            <EmptyBtn>
              <Plus size={14} weight="bold" /> Post a service
            </EmptyBtn>
          </Link>
        </EmptyBox>
      ) : (
        postedJobs.map((job) => (
          <ListingCard key={job.id}>
            <ListingTitle>{job.role}</ListingTitle>
            <ListingMeta>
              <span>
                <MapPin size={11} weight="fill" />
                {job.location}
              </span>
              <span>
                <CalendarBlank size={11} weight="fill" />
                {job.date}
              </span>
            </ListingMeta>
            <ListingSalary>{job.salary}</ListingSalary>
            {job.chips?.length > 0 && (
              <ChipsRow>
                {job.chips.slice(0, 3).map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </ChipsRow>
            )}
          </ListingCard>
        ))
      )}
    </Page>
  );
}
