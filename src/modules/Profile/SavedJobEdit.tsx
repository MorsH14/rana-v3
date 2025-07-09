import { savedFilters } from "@/db";
import { COLORS } from "@/utils/colors.util";
import { MoobileBody21SMBlue50, MoobileBody21SMRed500, WebBody2M, WebCC2Gray300, WebCC2Gray700 } from "@/utils/typography";
import { AccordionDetails, Box } from "@mui/material";
import { DetailsWrapper, EditWrapper } from "./styles";
import IconButton from "@/components/Buttons/Button";
import { PencilSimple, Trash } from "@phosphor-icons/react/dist/ssr";

export default function SavedJobEdit() {
  return (
    <>
    <AccordionDetails>
              {savedFilters.map((item, index) => (
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
                    <WebCC2Gray300>
                      Location
                    </WebCC2Gray300>
                    <WebCC2Gray700>{item.location}</WebCC2Gray700>
                  </DetailsWrapper>
    
                  <DetailsWrapper>
                    <WebCC2Gray300>
                      Distance
                    </WebCC2Gray300>
                    <WebCC2Gray700>{item.distance}</WebCC2Gray700>
                  </DetailsWrapper>
    
                  <DetailsWrapper>
                    <WebCC2Gray300>
                      Price
                    </WebCC2Gray300>
                    <WebCC2Gray700>{item.price}</WebCC2Gray700>
                  </DetailsWrapper>
    
                  <EditWrapper>
                    <IconButton icon={<PencilSimple size={13} color={COLORS.Blue500}/>}>
                      <MoobileBody21SMBlue50>
                        <span>Edit</span>
                      </MoobileBody21SMBlue50>
                    </IconButton>
                    <IconButton icon={<Trash size={13} color={COLORS.Red500}/>}>
                      <MoobileBody21SMRed500>
                        <span>Delete  </span>
                      </MoobileBody21SMRed500>
                    </IconButton>
                  </EditWrapper>
                </Box>
              ))}

            </AccordionDetails>
    </>
  );
}
