import TextField from "@/components/Inputs/TextField";
import SelectField from "@/components/Select/SelectField";

export default function JobListEdit() {
  return (
    <>
    <TextField label="Job" placeholder="Type Job"/>
    <TextField label="Address" placeholder="Type Address"/>
    <SelectField label="Distance" placeholder="Type Address"/>
    </>
  )
}
