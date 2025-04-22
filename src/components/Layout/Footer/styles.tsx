import { COLORS } from "@/utils/colors.util";
import styled from "@emotion/styled";

export const FooterWrapper = styled.div`
    background-color: ${COLORS.black100};
    color: ${COLORS.white100};
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-around;
    align-items: center;
`