import { cn } from "@/lib/utils";

export function Section({
  className = "",
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      <div className="container-app">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <span className="eyebrow mb-3">{eyebrow}</span> : null}
      <h2 className="heading-lg text-white">{title}</h2>
      {description ? (
        <p className="mt-4 text-base md:text-lg text-slate-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}
