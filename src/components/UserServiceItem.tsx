import Image from 'next/image';
import Link from 'next/link';
import { IService, IUser, ServiceStatusEnum } from '../types';
import { renderTokenAmountFromConfig } from '../utils/conversion';
import { formatDate } from '../utils/dates';
import ServiceStatus from './ServiceStatus';
import { useChainId } from '../hooks/useChainId';

function UserServiceItem({ user, service }: { user: IUser; service: IService }) {
  const chainId = useChainId();

  const isBuyer = user?.id === service.buyer.id;

  return (
    <div className='flex flex-row gap-2 rounded-xl p-4 border border-gray-700 text-white bg-endnight'>
      <div className='flex flex-col items-top justify-between gap-4 w-full'>
        <div className='flex flex-col justify-start items-start gap-4 relative'>
          <div className='flex items-center justify-start'>
            <Image
              src={`/images/default-avatar-${Number(service.buyer.id) % 9}.jpeg`}
              className='w-10 mr-4 rounded-full'
              width={50}
              height={50}
              alt='default avatar'
            />
            <div className='flex flex-col'>
              <p className='text-gray-100 font-medium break-all'>{service.description?.title}</p>
              <p className='text-xs text-gray-500'>
                created by {service.buyer.handle} the {formatDate(Number(service.createdAt) * 1000)}
              </p>
            </div>
            <span className='absolute right-0 inline-flex items-center'>
              <ServiceStatus status={service.status} />
            </span>
          </div>

          <div className=' border-t border-gray-100 pt-4'>
            <div>
              {service.description?.keywords_raw?.split(',').map((keyword, i) => (
                <span
                  key={i}
                  className='inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2'>
                  {keyword}
                </span>
              ))}
            </div>
            <p className='text-sm text-gray-400  line-clamp-1 mt-4'>
              <strong>About:</strong> {service.description?.about}
            </p>
          </div>
        </div>

        <div className='flex flex-row gap-4 justify-between items-center border-t border-gray-700 pt-4'>
          {service.description?.rateToken && service.description?.rateAmount && (
            <p className='text-gray-100 font-bold line-clamp-1 max-w-[100px]'>
              {renderTokenAmountFromConfig(
                chainId,
                service.description.rateToken,
                service.description.rateAmount,
              )}
            </p>
          )}
          <Link
            className='text-zinc-600 bg-white hover:bg-zinc-200 hover:text-white px-5 py-2.5 rounded-xl text-sm-xl relative'
            href={`/dashboard/services/${service.id}`}>
            Show details
            {isBuyer && service.status == ServiceStatusEnum.Opened && (
              <div className='inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-midnight rounded-full border-2 border-white'>
                {service.proposals.length}
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserServiceItem;
