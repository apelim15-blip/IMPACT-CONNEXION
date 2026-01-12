import logoImage from "@/assets/logo.jpg";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10 md:h-12 md:w-12",
  lg: "h-16 w-16 md:h-20 md:w-20",
};

const Logo = ({ size = "md", showText = true, className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src={logoImage} 
        alt="Impact Connexion Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <span className="font-heading font-bold text-lg md:text-xl tracking-tight">
          IMPACT <span className="text-primary">CONNEXION</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
