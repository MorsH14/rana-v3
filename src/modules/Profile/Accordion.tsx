"use client";
import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material';
import { ArrowsDownUp, PencilSimple, Trash } from '@phosphor-icons/react/dist/ssr';
import { AccordionWrapper, DetailsWrapper, EditWrapper } from './styles';
import { MoobileBody21SMBlue50, MoobileBody21SMRed500, MoobileBodyUnderline, WebBody2B, WebBody2M, WebCC2Gray300, WebCC2Gray700 } from '@/utils/typography';
import { COLORS } from '@/utils/colors.util';
import IconButton from '@/components/Buttons/Button';
import DrawerBasic from '@/components/Drawer/Drawer';
import JobListEdit from './JobListEdit';

interface FilterItem {
  title: string;
  location: string;
  distance: string;
  price: string;
}

interface SavedFilterAccordionProps {
  filters: FilterItem[];
  onUpdate: (index: number, updatedFilter: FilterItem) => void;
  onDelete: (index: number) => void;
}

export default function SavedFilterAccordion({ filters, onUpdate, onDelete }: SavedFilterAccordionProps) {
  // If filters is undefined/null (initial load), default to empty array
  const safeFilters = filters || [];

  return (
    <AccordionWrapper>
      <Accordion sx={{ boxShadow: 'none' }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ArrowsDownUp />}
          sx={{ borderBottom: `1px solid ${COLORS.NeutralSolid50}` }}
        >
          <WebBody2B>
            SAVED FILTER ({safeFilters.length})
          </WebBody2B>
        </AccordionSummary>

        <AccordionDetails>
          {safeFilters.map((item, index) => (
            <Box
              key={index}
              sx={{
                border: `1px solid ${COLORS.NeutralSolid50}`,
                borderRadius: 2,
                p: '12px',
                mb: 2,
                mt: '24px',
              }}
            >
              <WebBody2M>{item.title}</WebBody2M>

              <DetailsWrapper>
                <WebCC2Gray300>Location</WebCC2Gray300>
                <WebCC2Gray700>{item.location}</WebCC2Gray700>
              </DetailsWrapper>

              <DetailsWrapper>
                <WebCC2Gray300>Distance</WebCC2Gray300>
                <WebCC2Gray700>{item.distance}</WebCC2Gray700>
              </DetailsWrapper>

              <DetailsWrapper>
                <WebCC2Gray300>Price</WebCC2Gray300>
                <WebCC2Gray700>{item.price}</WebCC2Gray700>
              </DetailsWrapper>

              <EditWrapper>
                <DrawerBasic
                  headerText="Edit Filter"
                  label={
                    <IconButton icon={<PencilSimple size={13} color={COLORS.Blue500} />}>
                      <MoobileBody21SMBlue50><span>Edit</span></MoobileBody21SMBlue50>
                    </IconButton>
                  }
                >
                  <JobListEdit
                    filter={item}
                    onSave={(updated: FilterItem) => onUpdate(index, updated)}
                  />
                </DrawerBasic>

                <div onClick={() => onDelete(index)} style={{ cursor: 'pointer' }}>
                  <IconButton icon={<Trash size={13} color={COLORS.Red500} />}>
                    <MoobileBody21SMRed500>
                      <span>Delete</span>
                    </MoobileBody21SMRed500>
                  </IconButton>
                </div>
              </EditWrapper>
            </Box>
          ))}

          {safeFilters.length === 0 && (
            <Box p={2} textAlign="center">
              <WebCC2Gray300>No saved filters yet.</WebCC2Gray300>
            </Box>
          )}

          <Box display="flex" justifyContent="flex-end" mt={'24px'}>
            {/* Future: Add "Clear All" or "Add New" functionality here */}
            {safeFilters.length > 0 && (
              <MoobileBodyUnderline onClick={() => { safeFilters.forEach((_, i) => onDelete(0)); }}>
                Clear all
              </MoobileBodyUnderline>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </AccordionWrapper>
  );
}