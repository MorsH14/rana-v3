"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, X } from "@phosphor-icons/react/dist/ssr";
import { useLocalStorage } from "@/utils/hooks/useLocalStorage";
import { initialUserData } from "@/db";
import {
  PostJobWrapper,
  PostJobHeader,
  PostJobLogo,
  CloseButton,
  ProgressBar,
  ProgressSegment,
  StepTitle,
  StepSubtitle,
  FieldLabel,
  FieldGroup,
  TextInput,
  TextArea,
  CategoryGrid,
  CategoryCard,
  TagsGrid,
  TagChip,
  RateRow,
  NairaPrefix,
  NairaSymbol,
  AmountInput,
  UnitSelect,
  StateSelect,
  NavRow,
  BackBtn,
  ContinueBtn,
  SuccessWrapper,
  SuccessIconBox,
  SuccessTitle,
  SuccessSubtitle,
  PreviewLabel,
} from "./post-job.styles";

type Step = 1 | 2 | 3 | "done";

const CATEGORIES = [
  { value: "education", label: "Education", emoji: "📚" },
  { value: "tech", label: "Tech & Digital", emoji: "💻" },
  { value: "home-services", label: "Home Services", emoji: "🏠" },
  { value: "fashion", label: "Fashion & Beauty", emoji: "👗" },
  { value: "food-events", label: "Food & Events", emoji: "🍽️" },
  { value: "transport", label: "Transport", emoji: "🚗" },
];

const SERVICE_TAGS = [
  "Home Visit", "Online", "On-site", "Remote",
  "Same Day", "Emergency", "Weekend", "Flexible Hours",
];

const RATE_UNITS = [
  "/month", "/day", "/project", "/session",
  "/event", "/hour", "/job", "/outfit", "/occasion",
];

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

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

function formatDate(d: Date) {
  const day = d.getDate();
  const suffix =
    day % 10 === 1 && day !== 11 ? "st"
    : day % 10 === 2 && day !== 12 ? "nd"
    : day % 10 === 3 && day !== 13 ? "rd"
    : "th";
  const month = d.toLocaleString("en-US", { month: "long" });
  return `${day}${suffix} ${month} ${d.getFullYear()}`;
}

export default function PostJobWizard() {
  const router = useRouter();
  const [user] = useLocalStorage("rana-user-profile", initialUserData);
  const [, setPostedJobs] = useLocalStorage<PostedJob[]>("rana-posted-jobs", []);

  const [step, setStep] = useState<Step>(1);

  // Step 1
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  // Step 2
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // Step 3
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("/month");
  const [stateLocation, setStateLocation] = useState("");

  const toggleTag = (tag: string) =>
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const handlePost = () => {
    const categoryLabel =
      CATEGORIES.find((c) => c.value === category)?.label ?? category;

    const chips = [
      categoryLabel,
      ...tags.slice(0, 2),
    ];

    const salaryValue = parseInt(amount.replace(/,/g, ""), 10) || 0;
    const salaryDisplay = `₦${Number(amount.replace(/,/g, "")).toLocaleString("en-NG")}${unit}`;

    const newJob: PostedJob = {
      id: `posted-${Date.now()}`,
      company: user.name,
      role: title,
      date: formatDate(new Date()),
      salary: salaryDisplay,
      salaryValue,
      location: stateLocation,
      logo: user.profileImage || "/assets/images/logo.jpeg",
      category,
      description,
      chips,
    };

    setPostedJobs((prev) => [newJob, ...prev]);
    setStep("done");
  };

  const canContinue1 = title.trim().length >= 3 && category !== "";
  const canContinue2 = description.trim().length >= 20;
  const canContinue3 =
    amount.replace(/,/g, "").length > 0 &&
    parseInt(amount.replace(/,/g, ""), 10) > 0 &&
    stateLocation !== "";

  return (
    <PostJobWrapper>
      <PostJobHeader>
        <PostJobLogo>Ranajob</PostJobLogo>
        <CloseButton onClick={() => router.push("/")}>
          <X size={16} weight="bold" />
        </CloseButton>
      </PostJobHeader>

      {step !== "done" && (
        <ProgressBar>
          {([1, 2, 3] as const).map((s) => (
            <ProgressSegment
              key={s}
              active={step === s}
              done={typeof step === "number" && step > s}
            />
          ))}
        </ProgressBar>
      )}

      {/* ── Step 1 ── */}
      {step === 1 && (
        <>
          <StepTitle>What do you offer?</StepTitle>
          <StepSubtitle>Give your service a clear, specific title</StepSubtitle>

          <FieldGroup>
            <FieldLabel htmlFor="title">Service title</FieldLabel>
            <TextInput
              id="title"
              type="text"
              placeholder="e.g. Lesson Teacher, Event Photographer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Category</FieldLabel>
            <CategoryGrid>
              {CATEGORIES.map((cat) => (
                <CategoryCard
                  key={cat.value}
                  type="button"
                  selected={category === cat.value}
                  onClick={() => setCategory(cat.value)}
                >
                  <span style={{ fontSize: 22 }}>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </CategoryCard>
              ))}
            </CategoryGrid>
          </FieldGroup>

          <NavRow>
            <ContinueBtn
              disabled={!canContinue1}
              onClick={() => setStep(2)}
            >
              Continue
            </ContinueBtn>
          </NavRow>
        </>
      )}

      {/* ── Step 2 ── */}
      {step === 2 && (
        <>
          <StepTitle>Describe your service</StepTitle>
          <StepSubtitle>Help clients understand what you do and why you're great</StepSubtitle>

          <FieldGroup>
            <FieldLabel htmlFor="desc">Description</FieldLabel>
            <TextArea
              id="desc"
              placeholder="Tell clients what you offer, your experience, and what makes you stand out..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoFocus
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>Service type <span style={{ fontWeight: 400, color: "#A4ABB8" }}>(optional)</span></FieldLabel>
            <TagsGrid>
              {SERVICE_TAGS.map((tag) => (
                <TagChip
                  key={tag}
                  type="button"
                  selected={tags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </TagChip>
              ))}
            </TagsGrid>
          </FieldGroup>

          <NavRow>
            <BackBtn type="button" onClick={() => setStep(1)}>
              <ArrowLeft size={15} weight="bold" /> Back
            </BackBtn>
            <ContinueBtn disabled={!canContinue2} onClick={() => setStep(3)}>
              Continue
            </ContinueBtn>
          </NavRow>
        </>
      )}

      {/* ── Step 3 ── */}
      {step === 3 && (
        <>
          <StepTitle>Your rate & location</StepTitle>
          <StepSubtitle>Set your price and where you can work</StepSubtitle>

          <FieldGroup>
            <FieldLabel>Your rate</FieldLabel>
            <RateRow>
              <NairaPrefix>
                <NairaSymbol>₦</NairaSymbol>
                <AmountInput
                  type="number"
                  placeholder="e.g. 15000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  autoFocus
                />
              </NairaPrefix>
              <UnitSelect
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                {RATE_UNITS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </UnitSelect>
            </RateRow>
          </FieldGroup>

          <FieldGroup>
            <FieldLabel htmlFor="state">Your location</FieldLabel>
            <StateSelect
              id="state"
              value={stateLocation}
              onChange={(e) => setStateLocation(e.target.value)}
            >
              <option value="">Select state</option>
              {NIGERIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </StateSelect>
          </FieldGroup>

          <NavRow>
            <BackBtn type="button" onClick={() => setStep(2)}>
              <ArrowLeft size={15} weight="bold" /> Back
            </BackBtn>
            <ContinueBtn disabled={!canContinue3} onClick={handlePost}>
              Post listing
            </ContinueBtn>
          </NavRow>
        </>
      )}

      {/* ── Done ── */}
      {step === "done" && (
        <SuccessWrapper>
          <SuccessIconBox>
            <CheckCircle size={40} color="white" weight="fill" />
          </SuccessIconBox>
          <SuccessTitle>You&apos;re live!</SuccessTitle>
          <SuccessSubtitle>
            Your listing is now visible to clients. They can contact you directly via WhatsApp.
          </SuccessSubtitle>

          <PreviewLabel>Your listing</PreviewLabel>

          <div style={{ width: "100%", background: "#F8F9FB", borderRadius: 14, padding: "16px", textAlign: "left" }}>
            <div style={{ fontSize: 13, color: "#808897", marginBottom: 4 }}>
              {CATEGORIES.find((c) => c.value === category)?.label}
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#0D0D12", marginBottom: 4 }}>
              {title}
            </div>
            <div style={{ fontSize: 14, color: "#353849" }}>
              ₦{Number(amount).toLocaleString("en-NG")}{unit} · {stateLocation}
            </div>
          </div>

          <NavRow style={{ width: "100%" }}>
            <ContinueBtn onClick={() => router.push("/")}>
              Browse listings
            </ContinueBtn>
          </NavRow>
        </SuccessWrapper>
      )}
    </PostJobWrapper>
  );
}
