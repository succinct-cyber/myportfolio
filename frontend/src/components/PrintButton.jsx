"use client";
import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="btn-ghost print:hidden">
      <Printer size={13} /> Print / Save as PDF
    </button>
  );
}
