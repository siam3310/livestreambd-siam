
const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-primary py-4 px-4 text-primary-foreground mt-8">
      <div className="container flex flex-col items-center justify-center">
        <p className="text-sm text-center">
          © {year} LiveStreamBD. All rights reserved.
        </p>
        <p className="text-xs text-center mt-1 text-primary-foreground/60">
          Watch live tv and sports from Bangladesh for free.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
