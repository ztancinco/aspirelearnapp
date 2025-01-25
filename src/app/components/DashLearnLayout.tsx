"use client";
import React from "react";
import Sidebar from "./SideBar";

export default function DashLearnLayout ({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 h-full">
        <Sidebar />
      </aside>
      {/* Main Content */}
      <section className="flex-1 p-4 overflow-auto">
        <div className="max-w-8xl mx-auto px-2">{children}</div>
      </section>
    </main>
  );
}
