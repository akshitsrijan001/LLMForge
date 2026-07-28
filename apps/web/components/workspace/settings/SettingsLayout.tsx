import TopBar from "./TopBar";
import InfrastructureCard from "./InfrastructureCard";
import InferenceCard from "./InferenceCard";
import InterfaceCard from "./InterfaceCard";

export default function SettingsLayout() {
  return (
    <main className="flex-1 overflow-y-auto bg-[#0b0a09] text-white">

      <TopBar />

      <div className="mx-auto max-w-5xl px-8 py-8 lg:px-12">

        <div className="mb-10">

          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-orange-300/70">
            Workspace Configuration
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white">
            Settings
          </h1>

          <p className="mt-3 max-w-3xl text-[15px] leading-7 text-white/45">
            Configure your local AI environment, inference defaults, interface
            preferences and workspace behaviour.
          </p>

        </div>

        <div className="mx-auto max-w-4xl space-y-8">

          <InfrastructureCard />

          <InferenceCard />

          <InterfaceCard />

        </div>

      </div>

    </main>
  );
}