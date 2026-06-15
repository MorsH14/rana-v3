"use client";

import { useState } from "react";
import {
  CaretDown,
  Check,
  X,
  Suitcase,
  Money,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import styled from "@emotion/styled";
import { FilterPillsBar } from "./home.styles";
import { options, amount, location } from "@/utils/constants";

/* ─── styles ─── */

const PillWrap = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const PillBtn = styled.button<{ active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 36px;
  padding: 0 13px 0 11px;
  border-radius: 99px;
  border: 1.5px solid
    ${({ active }) =>
      active ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.18)"};
  background: ${({ active }) =>
    active ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.05)"};
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: ${({ active }) => (active ? 600 : 500)};
  color: ${({ active }) => (active ? "white" : "rgba(255,255,255,0.65)")};
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition: border-color 0.15s, background 0.15s, color 0.15s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.48);
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const ClearDot = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
  border: none;
  cursor: pointer;
  padding: 0;
  color: white;
  flex-shrink: 0;
  transition: background 0.12s;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

/* Transparent backdrop — catches clicks outside to close the dropdown */
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9998;
`;

/* position: fixed so parent overflow never clips it */
const DropPanel = styled.div`
  position: fixed;
  min-width: 210px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  padding: 6px;
`;

const DropOption = styled.button<{ active?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  background: ${({ active }) => (active ? "#f3f4f6" : "transparent")};
  border: none;
  border-radius: 8px;
  font-family: Inter, sans-serif;
  font-size: 13px;
  font-weight: ${({ active }) => (active ? 600 : 400)};
  color: ${({ active }) => (active ? "#0d0d12" : "#4b5563")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  transition: background 0.1s;

  &:hover {
    background: #f3f4f6;
    color: #0d0d12;
  }
`;

/* ─── helpers ─── */

const getLabel = (
  opts: { value: string | number; label: string }[],
  val: string | number
) => opts.find((o) => o.value === val)?.label ?? "";

type Panel = "category" | "price" | "location" | null;

interface DropPos {
  top: number;
  left: number;
}

interface SelectPropProps {
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedPrice: string | number;
  setSelectedPrice: (v: string | number) => void;
  selectedLocation: string;
  setSelectedLocation: (v: string) => void;
}

export default function SelectProp({
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
  selectedLocation,
  setSelectedLocation,
}: SelectPropProps) {
  const [open, setOpen] = useState<Panel>(null);
  const [pos, setPos] = useState<DropPos>({ top: 0, left: 0 });

  const openPanel = (p: Panel, e: React.MouseEvent<HTMLButtonElement>) => {
    if (open === p) {
      setOpen(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const dropW = 210;
    const left =
      rect.left + dropW > window.innerWidth
        ? window.innerWidth - dropW - 8
        : rect.left;
    setPos({ top: rect.bottom + 8, left });
    setOpen(p);
  };

  const close = () => setOpen(null);

  const categoryActive = selectedCategory !== "all";
  const priceActive = selectedPrice !== "price";
  const locationActive = selectedLocation !== "state";

  const renderDrop = (
    panel: Panel,
    opts: { value: string | number; label: string }[],
    current: string | number,
    select: (v: string | number) => void
  ) =>
    open === panel ? (
      <>
        <Backdrop onClick={close} />
        <DropPanel style={{ top: pos.top, left: pos.left }}>
          {opts.map((o) => {
            const isActive =
              current === o.value || String(current) === String(o.value);
            return (
              <DropOption
                key={o.value}
                active={isActive}
                onClick={() => {
                  select(o.value);
                  close();
                }}
              >
                {o.label}
                {isActive && (
                  <Check size={13} weight="bold" color="#6366f1" />
                )}
              </DropOption>
            );
          })}
        </DropPanel>
      </>
    ) : null;

  return (
    <FilterPillsBar>
      {/* Category */}
      <PillWrap>
        <PillBtn
          active={categoryActive}
          onClick={(e) => openPanel("category", e)}
        >
          <Suitcase size={14} weight="bold" />
          <span>{getLabel(options, selectedCategory)}</span>
          {categoryActive ? (
            <ClearDot
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCategory("all");
                close();
              }}
            >
              <X size={8} weight="bold" />
            </ClearDot>
          ) : (
            <CaretDown size={11} weight="bold" style={{ opacity: 0.55 }} />
          )}
        </PillBtn>
        {renderDrop("category", options, selectedCategory, (v) =>
          setSelectedCategory(String(v))
        )}
      </PillWrap>

      {/* Price */}
      <PillWrap>
        <PillBtn active={priceActive} onClick={(e) => openPanel("price", e)}>
          <Money size={14} weight="bold" />
          <span>{getLabel(amount, selectedPrice)}</span>
          {priceActive ? (
            <ClearDot
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPrice("price");
                close();
              }}
            >
              <X size={8} weight="bold" />
            </ClearDot>
          ) : (
            <CaretDown size={11} weight="bold" style={{ opacity: 0.55 }} />
          )}
        </PillBtn>
        {renderDrop("price", amount, selectedPrice, setSelectedPrice)}
      </PillWrap>

      {/* Location */}
      <PillWrap>
        <PillBtn
          active={locationActive}
          onClick={(e) => openPanel("location", e)}
        >
          <MapPin size={14} weight="bold" />
          <span>{getLabel(location, selectedLocation)}</span>
          {locationActive ? (
            <ClearDot
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLocation("state");
                close();
              }}
            >
              <X size={8} weight="bold" />
            </ClearDot>
          ) : (
            <CaretDown size={11} weight="bold" style={{ opacity: 0.55 }} />
          )}
        </PillBtn>
        {renderDrop("location", location, selectedLocation, (v) =>
          setSelectedLocation(String(v))
        )}
      </PillWrap>
    </FilterPillsBar>
  );
}
