export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-[0.3] mask-fade-b" />
        <div className="absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl" />
      </div>
      <div className="container-app relative">
        {eyebrow ? <span className="eyebrow mb-4">{eyebrow}</span> : null}
        <h1 className="heading-xl text-white max-w-4xl">{title}</h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-base md:text-lg text-slate-300">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
