type SidebarLogoProps = {
  version?: string;
};

export default function SidebarLogo({
  version = "v2.0",
}: SidebarLogoProps) {
  return (
    <div className="mb-8">

      <div className="flex items-center gap-4">

        <div className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-orange-400
          via-orange-500
          to-orange-700
          text-2xl
          font-bold
          shadow-lg
          shadow-orange-500/30
        ">
          ⚡
        </div>

        <div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            LLMForge
          </h1>

          <p className="text-sm text-orange-300">
            AI Workspace
          </p>

        </div>

      </div>

      <div className="mt-5 h-px bg-gradient-to-r from-orange-500/40 to-transparent" />

    </div>
  );
}