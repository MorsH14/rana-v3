import ProfilePictureEdit from "./ProfilePictureEdit";
import TextField from "@/components/Inputs/TextField";


export default function ProfileEdit() {
  return (
    <>
    <ProfilePictureEdit/>
    <TextField label="Name" placeholder="Type Name"/>
    <TextField label="Number" placeholder="Type Number"/>
    <TextField label="Email" placeholder="Type Email"/>
    <TextField label="Address" placeholder="Type Address"/>
    <TextField label="No of job posted" placeholder="12"/>
    <TextField label="Gender" placeholder="eg male or female"/>
    <TextField label="Date of Birth" placeholder="dd/mm/yy"/>
    </>
  );
}
 