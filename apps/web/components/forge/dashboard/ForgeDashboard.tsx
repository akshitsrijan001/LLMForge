"use client";

import { Atmosphere } from "../common/Atmosphere";

import ForgeSidebar from "../layout/ForgeSidebar";
import ForgeHeader from "../layout/ForgeHeader";

import { ForgeHero } from "./ForgeHero";
import { ContinueWorking } from "./ContinueWorking";
import { QuickActionsGrid } from "./QuickActionsGrid";
import { WorkspaceActivity } from "./WorkspaceActivity";
import { RecentChats } from "./RecentChats";
import { SystemMonitor } from "./SystemMonitor";
import { Summaries } from "./Summaries";
import ModelUsage from "./ModelUsage";
import RecentFiles from "./RecentFiles";

export default function ForgeDashboard() {
  return (
    
    <div className="relative min-h-screen overflow-hidden bg-[#0b0a09] text-white">
      <Atmosphere />

      <div className="relative z-10 flex h-screen">
        <ForgeSidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <ForgeHeader />

          <main className="space-y-6 overflow-y-auto p-4 sm:p-6 xl:p-8">

            <ForgeHero />

            {/* Continue Working + System Monitor */}
            <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12">
              <div className="xl:col-span-8">
                <ContinueWorking />
              </div>

              <div className="xl:col-span-4">
                <SystemMonitor />
              </div>
            </div>

            

            <QuickActionsGrid />

            {/* Workspace Activity + Telemetry */}
            <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12">
              <div className="xl:col-span-8">
                <WorkspaceActivity />
              </div>

              <div className="xl:col-span-4">
                <ModelUsage />
              </div>
            </div>

            {/* Recent Chats + Summaries */}
            <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12">
              <div className="xl:col-span-8">
                <RecentChats />
              </div>

              <div className="space-y-6 xl:col-span-4">
                <Summaries />
                <RecentFiles />
              </div>
            </div>

          </main>
        </div>
      </div>
        </div>
  );
}
