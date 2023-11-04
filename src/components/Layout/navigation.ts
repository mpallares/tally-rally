import {
  BriefcaseIcon,
  ChatBubbleBottomCenterIcon,
  UserGroupIcon,
  UserIcon,
  PresentationChartLineIcon,
  ExclamationCircleIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  { name: 'My board', href: '/dashboard', icon: UserIcon, current: false },
  { name: 'Earn', href: '/dashboard/earn', icon: CurrencyDollarIcon, current: false },
  { name: 'Race', href: '/dashboard/messaging', icon: PlayIcon, current: false },
  { name: 'Talents', href: '/dashboard/talents', icon: UserGroupIcon, current: false },
];

export const navigationAdmin = [
  {
    name: 'Presentation',
    href: `/admin/presentation`,
    icon: PresentationChartLineIcon,
    current: false,
  },
  {
    name: 'Fees strategies',
    href: `/admin/fees`,
    icon: ShieldCheckIcon,
    current: false,
  },
  {
    name: 'Dispute',
    href: `/admin/dispute`,
    icon: ExclamationCircleIcon,
    current: false,
  },
  {
    name: 'Web3Mail',
    href: `/admin/web3mail`,
    icon: EnvelopeIcon,
    current: false,
  },
];
