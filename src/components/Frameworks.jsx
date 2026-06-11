import { OrbitingCircles } from "./ObitingCircles";

export function Frameworks() {
  const skills = [
    "auth0",
    "blazor",
    "cplusplus",
    "csharp",
    "css3",
    "dotnet",
    "dotnetcore",
    "git",
    "html5",
    "javascript",
    "microsoft",
    "react",
    "sqlite",
    "tailwindcss",
    "vitejs",
    "wordpress",
  ];
  return (
    <div className="relative w-full overflow-hidden">
      {/* subtle background shimmer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(92,51,204,0.35) 0%, transparent 55%), radial-gradient(circle at 70% 60%, rgba(51,194,204,0.25) 0%, transparent 50%)",
        }}
      />

      <div className="relative flex h-[18rem] w-full flex-col items-center justify-center">
        {/* outer ring */}
        <OrbitingCircles iconSize={42} radius={185} duration={26} speed={1}>
          {skills.map((skill, index) => (
            <Icon key={index} src={`assets/logos/${skill}.svg`} />
          ))}
        </OrbitingCircles>

        {/* inner ring */}
        <OrbitingCircles iconSize={26} radius={112} duration={18} reverse speed={1.25}>
          {skills.map((skill, index) => (
            <Icon key={index} src={`assets/logos/${skill}.svg`} className="opacity-90" />
          ))}
        </OrbitingCircles>

        {/* floating mini particles */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(51,194,204,0.45) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            backgroundPosition: "0 0",
            maskImage:
              "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
      </div>

      {/* hover pulse hint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, rgba(51,194,204,0.18) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}

const Icon = ({ src, className }) => (
  <img
    src={src}
    className={
      "duration-200 rounded-sm hover:scale-110 transition-transform " +
      (className ?? "")
    }
  />
);
