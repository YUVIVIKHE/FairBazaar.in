import {
  Code2, Layers, Brain, Bot, Users, Briefcase, Globe, Smartphone, Cloud, Workflow, Sparkles, Compass, Palette, Boxes,
  BarChart3, Target, Package, Cpu, ShieldCheck, HeartPulse, GraduationCap, Sprout, Store, Factory, Building2, Hotel,
  Landmark, Truck, Car, Scale, Rocket, TrendingUp, Server, Database, Zap, FileText, MessageSquare, CalendarDays, MapPin,
  Wallet, Receipt, ClipboardCheck, Bell, Lock, Search, Link2, Settings2, Gauge, type LucideProps,
} from "lucide-react";
import type { IconName } from "@/content/types";

const map: Record<IconName, React.ComponentType<LucideProps>> = {
  code: Code2, layers: Layers, brain: Brain, bot: Bot, users: Users, briefcase: Briefcase, globe: Globe, smartphone: Smartphone,
  cloud: Cloud, workflow: Workflow, sparkles: Sparkles, compass: Compass, palette: Palette, boxes: Boxes, chart: BarChart3,
  target: Target, package: Package, cpu: Cpu, shield: ShieldCheck, heart: HeartPulse, graduation: GraduationCap, sprout: Sprout,
  store: Store, factory: Factory, building: Building2, hotel: Hotel, landmark: Landmark, truck: Truck, car: Car, scale: Scale,
  rocket: Rocket, trending: TrendingUp, server: Server, database: Database, zap: Zap, file: FileText, message: MessageSquare,
  calendar: CalendarDays, map: MapPin, wallet: Wallet, receipt: Receipt, clipboard: ClipboardCheck, bell: Bell, lock: Lock,
  search: Search, link: Link2, settings: Settings2, gauge: Gauge,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name] ?? Sparkles;
  return <C aria-hidden="true" strokeWidth={1.75} {...props} />;
}

export function IconTile({ name, tone = "light", className = "" }: { name: IconName; tone?: "light" | "dark"; className?: string }) {
  const toneCls =
    tone === "dark"
      ? "bg-gradient-to-br from-brand-500/25 to-mint-400/10 text-mint-300 ring-1 ring-white/10"
      : "bg-gradient-to-br from-brand-50 to-white text-brand-600 ring-1 ring-brand-100";
  return (
    <span className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl ${toneCls} ${className}`}>
      <Icon name={name} className="size-5" />
    </span>
  );
}
