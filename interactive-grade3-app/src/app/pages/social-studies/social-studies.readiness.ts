import type { SocialStudiesPlan } from './social-studies.readiness-types';
import { SOCIAL_STUDIES_PLACES_PLANS } from './social-studies.readiness-places';
import { SOCIAL_STUDIES_COMMUNITY_PLANS } from './social-studies.readiness-community';
import { SOCIAL_STUDIES_CIVICS_PLANS } from './social-studies.readiness-civics';

export const SOCIAL_STUDIES_READINESS: Record<string, SocialStudiesPlan> = {
  ...SOCIAL_STUDIES_PLACES_PLANS,
  ...SOCIAL_STUDIES_COMMUNITY_PLANS,
  ...SOCIAL_STUDIES_CIVICS_PLANS
};

/** Suggested preparation only. Neither the date nor a viewed page advances learning progress. */
export const SOCIAL_STUDIES_DAILY_PLAN: { role: 'recap' | 'current' | 'upcoming'; code: string; href: string }[] = [
  { role: 'recap', code: '3.2.3', href: '/ruchika/grade3/social-studies/chapters/native-peoples?standard=3.2.3' },
  { role: 'recap', code: '3.2.4', href: '/ruchika/grade3/social-studies/chapters/native-peoples?standard=3.2.4' },
  { role: 'current', code: '3.3.1', href: '/ruchika/grade3/social-studies/chapters/community-history?standard=3.3.1' },
  { role: 'upcoming', code: '3.3.2', href: '/ruchika/grade3/social-studies/chapters/community-history?standard=3.3.2' },
  { role: 'upcoming', code: '3.3.3', href: '/ruchika/grade3/social-studies/chapters/community-history?standard=3.3.3' },
  { role: 'upcoming', code: '3.4.1', href: '/ruchika/grade3/social-studies/chapters/government-citizenship?standard=3.4.1' },
  { role: 'upcoming', code: '3.4.2', href: '/ruchika/grade3/social-studies/chapters/government-citizenship?standard=3.4.2' }
];
