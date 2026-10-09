import { Brain, Utensils, Heart, BookOpen, Smartphone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const marks = [Brain, Utensils, Heart, BookOpen, Smartphone, MessageCircle];
const surfaces = ["bg-sky text-foreground", "bg-marigold text-foreground", "bg-peach text-foreground", "bg-coral text-card", "bg-midnight text-card", "bg-accent text-foreground"];

export function TopicArtwork({ index, className }: { index: number; className?: string }) {
  const Mark = marks[index % marks.length] ?? Brain;
  return (
    <div aria-hidden="true" className={cn("topic-artwork relative flex aspect-[4/3] items-center justify-center overflow-hidden", surfaces[index % surfaces.length], className)}>
      <span className="absolute left-6 top-5 text-sm font-medium">0{index + 1}</span>
      <div className="artwork-paper flex h-24 w-24 rotate-[-8deg] items-center justify-center rounded-xl border-2 border-foreground bg-card text-foreground sm:h-32 sm:w-32">
        <Mark size={64} strokeWidth={1.4} className="max-h-[60%] max-w-[60%]" />
      </div>
      <span className="absolute bottom-5 right-7 text-4xl">✳</span>
    </div>
  );
}