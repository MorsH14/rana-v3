import { Card, Box, Typography, Button } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function StatsCard() {
  return (
    <Card sx={{ width: 300, p: 2, borderRadius: 2 }}>
      {/* Row 1 */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Box display="flex" alignItems="center" gap={1}>
          <WorkOutlineIcon fontSize="small" />
          <Typography variant="body2" color="text.secondary">Job posted</Typography>
        </Box>
        <Typography variant="body2">12</Typography>
      </Box>

      {/* Row 2 */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <MonetizationOnIcon fontSize="small" />
          <Typography variant="body2" color="text.secondary">Coin left</Typography>
          <Button size="small" variant="contained" color="success">Buy more →</Button>
        </Box>
        <Typography variant="body2">300</Typography>
      </Box>
    </Card>
  );
}
