import { useRouter } from 'next/router';

function SideLink({ children, href }: { children: React.ReactNode; href: string }) {
  const router = useRouter();
  const isDashboard = href == '/dashboard';
  let className = isDashboard
    ? router.asPath === href
      ? 'w-full bg-trblue text-center'
      : 'hover:bg-midnight'
    : router.asPath.includes(href)
    ? 'text-center bg-trblue'
    : 'text-center hover:bg-trblue ';

  className += ' group flex items-center text-base rounded-[60px]';

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <div className={className}>
    <a className='w-full font-black py-4 uppercase text-[26px] text-trorange' href={href} onClick={handleClick} >
      {children}
    </a>
    </div>
  );
}

export default SideLink;
