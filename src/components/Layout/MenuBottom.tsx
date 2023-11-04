import BottomLink from './BottomLink';
import { navigation } from './navigation';

function MenuBottom() {
  return (
    <div className='menuBottom md:hidden fixed bottom-0 left-0 z-50 w-full h-28 p-2 pt-4 pb-8 bg-trbrown'>
      <div className={`grid h-full w-full grid-cols-3 font-black`}>
        {navigation.map(item => (
          <BottomLink key={item.name} href={item.href}>
            <span className='text-md'>{item.name}</span>
          </BottomLink>
        ))}
      </div>
    </div>
  );
}

export default MenuBottom;
