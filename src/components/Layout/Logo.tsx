import Image from 'next/image';
import Link from 'next/link';

function Logo({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  return (
    <div className={`text-1xl ${theme == 'light' ? 'text-white' : 'text-redpraha'}`}>
      <Link href='/' className='flex items-center'>
        <Image
          src={'/tally-logo-desktop.svg'}
          width={180}
          height={36}
          alt='StarterKit logo'
          className='-ml-2 sm:ml-0'
        />
      </Link>
    </div>
  );
}

export default Logo;
