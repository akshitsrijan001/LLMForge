import PlaygroundPage from "../../../components/workspace/PlaygroundPage";
import PageLayout from "@/components/ui/PageLayout";
import PageHeader from "@/components/ui/PageHeader";

export default function Page() {
  return (
    <PageLayout>
      <PageHeader
        title="Playground"
        description="Experiment with prompts, compare model outputs, and fine-tune responses in a dedicated testing environment."
      />

      <PlaygroundPage />
    </PageLayout>
  );
}