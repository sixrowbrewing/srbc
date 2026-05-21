import {
  FlaskConical,
  Package,
  Coins,
  Timer,
  RefreshCw,
  Droplets,
} from "lucide-react";
import type { Benchmark } from "@/types/service";

export const industryBenchmarks: Benchmark[] = [
  {
    icon: FlaskConical,
    title: "Brewhouse Efficiency",
    description: "Measures extract efficiency from malt to fermentable sugars",
    levels: [
      { label: "World Class", value: "85-90%", tone: "success", width: "90%" },
      { label: "Good", value: "75-84%", tone: "warning", width: "80%" },
      { label: "Needs Improvement", value: "<75%", tone: "danger", width: "70%" },
    ],
  },
  {
    icon: Package,
    title: "Packaging Efficiency",
    description: "Beer successfully packaged vs total production volume",
    levels: [
      { label: "World Class", value: "95-98%", tone: "success", width: "97%" },
      { label: "Good", value: "90-94%", tone: "warning", width: "92%" },
      { label: "Needs Improvement", value: "<90%", tone: "danger", width: "85%" },
    ],
  },
  {
    icon: Coins,
    title: "Raw Material Cost",
    description: "Percentage of total revenue spent on raw materials",
    levels: [
      { label: "World Class", value: "35-40%", tone: "success", width: "38%" },
      { label: "Good", value: "41-50%", tone: "warning", width: "45%" },
      { label: "Needs Improvement", value: ">50%", tone: "danger", width: "55%" },
    ],
  },
  {
    icon: Timer,
    title: "Brewery Utilization",
    description: "Actual production vs maximum capacity over time",
    levels: [
      { label: "World Class", value: "80-90%", tone: "success", width: "85%" },
      { label: "Good", value: "60-79%", tone: "warning", width: "70%" },
      { label: "Needs Improvement", value: "<60%", tone: "danger", width: "50%" },
    ],
  },
  {
    icon: RefreshCw,
    title: "Batch Turnaround Time",
    description: "From brewing to packaging readiness for ales",
    levels: [
      { label: "World Class", value: "14-18 days", tone: "success", width: "90%" },
      { label: "Good", value: "19-25 days", tone: "warning", width: "70%" },
      { label: "Needs Improvement", value: ">25 days", tone: "danger", width: "50%" },
    ],
  },
  {
    icon: Droplets,
    title: "Water Usage Ratio",
    description: "Liters of water used per liter of beer produced",
    levels: [
      { label: "World Class", value: "3-4:1", tone: "success", width: "95%" },
      { label: "Good", value: "5-6:1", tone: "warning", width: "75%" },
      { label: "Needs Improvement", value: ">7:1", tone: "danger", width: "60%" },
    ],
  },
];
