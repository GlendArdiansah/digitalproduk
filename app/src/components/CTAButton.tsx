import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface CTAButtonProps {
  href?: string;
  to?: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

const CTAButton = ({ 
  href,
  to = '/checkout',
  children,
  className = '',
  external = false
}: CTAButtonProps) => {
  const buttonContent = (
    <motion.span
      className={`
        inline-flex items-center justify-center
        w-full max-w-[321px]
        py-4 px-6
        bg-accent-red text-white
        font-bold text-base
        rounded-[10px]
        uppercase tracking-wide
        cursor-pointer
        transition-shadow duration-200
        hover:shadow-cta
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.6
      }}
    >
      {children}
    </motion.span>
  );

  if (external && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex justify-center"
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <Link to={to} className="w-full flex justify-center">
      {buttonContent}
    </Link>
  );
};

export default CTAButton;
