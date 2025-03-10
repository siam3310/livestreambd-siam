
const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-primary py-4 px-4 text-primary-foreground mt-8">
      <div className="container flex flex-col items-center justify-center">
        <p className="text-sm text-center">
          © {year} LiveStreamBD. Watch live tv and sports from Bangladesh for free.
        </p>
        <p className="text-xs text-center mt-1 text-primary-foreground/60">
          All links are collected which are publicly available online.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
