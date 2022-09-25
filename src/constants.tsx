import GrandIcon from './components/icons/grand';
import ParentsIcon from './components/icons/parents';
import SelfIcon from './components/icons/self';
import SelfAndParentsIcon from './components/icons/self-parents';
import SelfSpouseKidsIcon from './components/icons/self-spouse-kids';
import { PlanDetailsFormType } from './components/insurance-wizard/plan-details';

export const TEXT_GRAY = '#2D3D54';
export const TEXT_GRAY_500 = '#55657D';
export const TEXT_GRAY_400 = '#8C98AB';
export const PRIMARY_RED = '#E06358';
export const PRIMARY_RED_500 = '#E06358';
export const PRIMARY_RED_600 = '#D44C46';
export const PRIMARY_RED_200 = '#FFE0CC';
export const SECONDARY_GRAY_100 = '#F2F0ED';
export const SECONDARY_GRAY = '#CCC4BA';
export const GHOST_BACKGROUND = '#ECE9E5';
export const BACKGROUND_COLOR = '#F2F0ED';
export const BOX_SHADOW = 'inset 0px -1px 0px #E1E5EB';
export const ACCENT_YELLOW_100 = '#FFDE9E';

export const INPUT_BORDER_COLOR = '#8C98AB';
export const SITE_SIZES = {
  navbar: {
    height: '80px',
  },
  sticky_bar: {
    height: '95px',
  },
};

export const PLAN_OPTIONS: PlanDetailsFormType['plan_type'][] = [
  {
    name: 'One',
    hint: 'Individual',
    value: 'one_individual',
    data: {
      price: 600,
      icon: <SelfIcon />,
      label: 'Self',
    },
  },
  {
    name: 'Pro',
    hint: 'Individual',

    value: 'pro_individual',
    data: {
      price: 0,
      icon: <ParentsIcon />,
      label: 'Parents',
    },
  },
  {
    name: 'Plus',
    hint: 'Individual + Individual',

    value: 'plus_individual',
    data: {
      price: 600,
      icon: <SelfAndParentsIcon />,
      label: 'Self + Parents',
    },
  },
  {
    name: 'Max',
    hint: 'Floater',

    value: 'max_floater',
    data: {
      price: 1800,
      icon: <SelfSpouseKidsIcon />,
      label: 'Self + Spouse + Kids',
    },
  },
  {
    name: 'Grand',
    hint: 'Floater',

    value: 'grand_floater',
    data: {
      price: 1800,
      icon: <GrandIcon />,
      label: 'Self + Spouse + Kids + Parents',
    },
  },
];
