import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import InfrastructureCard from "./InfrastructureCard";
import InferenceCard from "./InferenceCard";
import InterfaceCard from "./InterfaceCard";

export default function SettingsLayout() {
  return (
    <div className="flex min-h-screen bg-[#0B1020] text-white">
      <Sidebar />

      <main className="flex-1 flex flex-col">

        <TopBar />

        <div className="flex-1 flex justify-center">

          <div className="w-full max-w-6xl px-12 py-12">

            <h1 className="text-5xl font-bold">
              System Environment
            </h1>

            <p className="text-gray-400 text-lg mt-4 mb-12">
              Manage your local LLM connections, embedding models and vector databases.
            </p>

            <InfrastructureCard />

            <div className="mt-8">
              <InferenceCard />
            </div>

            <div className="mt-8">
              <InterfaceCard />
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}