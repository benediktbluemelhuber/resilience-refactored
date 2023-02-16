import { forwardRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// import icons
import { HomeIcon, UserCircleIcon, BuildingStorefrontIcon, CurrencyDollarIcon, GlobeEuropeAfricaIcon, TruckIcon, UserGroupIcon } from '@heroicons/react/24/solid';

type Props = {
	showNav: boolean;
};

const MENU_ITEMS = [
	{
		name: '1. Produktportfolio',
		icon: BuildingStorefrontIcon,
		path: '/ProductPortfolio'
	},
	{
		name: '2. Kundenorientierung',
		icon: UserCircleIcon,
		path: '/CustomerOrientation'
	},
	{
		name: '3. Finanzielle Nachhaltigkeit',
		icon: CurrencyDollarIcon,
		path: '/FinancialSustainability'
	},
	{
		name: '4. Go-to-Market Kanäle',
		icon: GlobeEuropeAfricaIcon,
		path: '/GoToMarketChannels'
	},
	{
		name: '5. Lieferanten',
		icon: UserGroupIcon,
		path: '/Suppliers'
	},
	{
		name: '6. Logistiksysteme',
		icon: TruckIcon,
		path: '/LogisticSystems'
	},
	{
		name: '7. Strategische Planung',
		icon: TruckIcon,
		path: '/StrategicPlanning'
	},
	{
		name: '8. ESG: Environmental, Social, Governance',
		icon: TruckIcon,
		path: '/ESG'
	},
	{
		name: '9. Mitarbeiter',
		icon: TruckIcon,
		path: '/Employees'
	}
];

const ACTIVE_STYLING = 'text-blue-900 bg-white';
const HOVER_STYLING = ACTIVE_STYLING.split(' ')
	.map((style) => `hover:${style}`)
	.join(' ');

const isActivePath = (path: string, currentPath: string) =>
	path === '/' ? currentPath === path : currentPath.includes(path);

// eslint-disable-next-line react/display-name
export const Sidebar = forwardRef<HTMLElement, Props>(({ showNav }, ref) => {
	const router = useRouter();
	
	
	

	return (
		<aside ref={ref} className={`fixed w-56 h-full bg-blue-900 shadow-sm`}>
			<div className="flex justify-center mt-5 mb-5">
			<Link
							href={'/'}
							>
						
				<Image src={'/TCW_logo_weiß.png'} alt={'TCW'} width={200} height={200} />
				</Link>
			</div>
			<div className="text-white flex justify-center mt-5 mb-4">
				Resilience Check
			</div>

			<ul className={'flex flex-col gap-2 ml-2 mr-2'}>
				{MENU_ITEMS.map(({ name, icon: Icon, path }) => (
					<li key={name.toLowerCase().replace(' ', '-')}>
						<Link
							href={path}
							className={`pl-6 py-3 rounded text-xs cursor-pointer flex items-center gap-2 transition duration-150 ease-in-out  ${HOVER_STYLING} ${
								isActivePath(path, router.pathname)
									? ACTIVE_STYLING
									: 'text-white'
							}`}
						>
							<Icon className={'h-5 w-5'} />
							{name}
						</Link>
					</li>
				))}
			</ul>
		</aside>
	);
});
