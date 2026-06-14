"use client";

import { useState, useRef, useEffect } from "react";
import { CaretDown, Check, X, Suitcase, Money, MapPin } from "@phosphor-icons/react/dist/ssr";
import styled from "@emotion/styled";
import { FilterPillsBar } from "./home.styles";
import { options, amount, location } from "@/utils/constants";

/* ─── local pill + dropdown styles ─── */

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

const DropPanel = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
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
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const toggle = (p: Panel) => setOpen((prev) => (prev === p ? null : p));

  const categoryActive = selectedCategory !== "all";
  const priceActive = selectedPrice !== "price";
  const locationActive = selectedLocation !== "state";

  return (
    <div ref={barRef} style={{ display: "contents" }}>
      <FilterPillsBar>
        {/* Category */}
        <PillWrap>
          <PillBtn active={categoryActive} onClick={() => toggle("category")}>
            <Suitcase size={14} weight="bold" />
            <span>{getLabel(options, selectedCategory)}</span>
            {categoryActive ? (
              <ClearDot
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCategory("all");
                }}
              >
                <X size={8} weight="bold" />
              </ClearDot>
            ) : (
              <CaretDown size={11} weight="bold" style={{ opacity: 0.55 }} />
            )}
          </PillBtn>
          {open === "category" && (
            <DropPanel>
              {options.map((o) => (
                <DropOption
                  key={o.value}
                  active={selectedCategory === String(o.value)}
                  onClick={() => {
                    setSelectedCategory(String(o.value));
                    setOpen(null);
                  }}
                >
                  {o.label}
                  {selectedCategory === String(o.value) && (
                    <Check size={13} weight="bold" color="#6366f1" />
                  )}
                </DropOption>
              ))}
            </DropPanel>
          )}
        </PillWrap>

        {/* Price */}
        <PillWrap>
          <PillBtn active={priceActive} onClick={() => toggle("price")}>
            <Money size={14} weight="bold" />
            <span>{getLabel(amount, selectedPrice)}</span>
            {priceActive ? (
              <ClearDot
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPrice("price");
                }}
              >
                <X size={8} weight="bold" />
              </ClearDot>
            ) : (
              <CaretDown size={11} weight="bold" style={{ opacity: 0.55 }} />
            )}
          </PillBtn>
          {open === "price" && (
            <DropPanel>
              {amount.map((o) => (
                <DropOption
                  key={o.value}
                  active={selectedPrice === o.value}
                  onClick={() => {
                    setSelectedPrice(o.value);
                    setOpen(null);
                  }}
                >
                  {o.label}
                  {selectedPrice === o.value && (
                    <Check size={13} weight="bold" color="#6366f1" />
                  )}
                </DropOption>
              ))}
            </DropPanel>
          )}
        </PillWrap>

        {/* Location */}
        <PillWrap>
          <PillBtn active={locationActive} onClick={() => toggle("location")}>
            <MapPin size={14} weight="bold" />
            <span>{getLabel(location, selectedLocation)}</span>
            {locationActive ? (
              <ClearDot
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLocation("state");
                }}
              >
                <X size={8} weight="bold" />
              </ClearDot>
            ) : (
              <CaretDown size={11} weight="bold" style={{ opacity: 0.55 }} />
            )}
          </PillBtn>
          {open === "location" && (
            <DropPanel>
              {location.map((o) => (
                <DropOption
                  key={o.value}
                  active={selectedLocation === String(o.value)}
                  onClick={() => {
                    setSelectedLocation(String(o.value));
                    setOpen(null);
                  }}
                >
                  {o.label}
                  {selectedLocation === String(o.value) && (
                    <Check size={13} weight="bold" color="#6366f1" />
                  )}
                </DropOption>
              ))}
            </DropPanel>
          )}
        </PillWrap>
      </FilterPillsBar>
    </div>
  );
}
