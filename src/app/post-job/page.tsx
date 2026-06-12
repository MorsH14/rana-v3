import PostJobWizard from "@/modules/PostJob";

export default function PostJobPage() {
  return (
    <div style={{ minHeight: "100vh", background: "white", display: "flex", justifyContent: "center" }}>
      <PostJobWizard />
    </div>
  );
}
