import { useRouter } from 'next/router';

function BottomLink({ children, href }: { children: React.ReactNode; href: string }) {
  const router = useRouter();
  const isDashboard = href == '/dashboard';
  let className = isDashboard
    ? router.asPath === href
      ? 'bg-trblue'
      : ''
    : router.asPath.includes(href)
    ? 'bg-trblue'
    : '';

  className +=
    ' inline-flex text-trorange flex-col items-center justify-center px-2 hover:bg-trblue group m-2 rounded-[24px] uppercase';

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export default BottomLink;
