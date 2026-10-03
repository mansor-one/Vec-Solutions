import { cache } from "react";
import { getHubCopy, getSorayaProfile } from "./content-hub";
import { newsCopy, type NewsCopy, type Person } from "../content/news";
import { dataset, projectId } from "../../sanity/env";
export {
  getNews,
  getNewsBySlug,
  publicPostFilter,
  fundingStatus,
  safeUrl,
} from "./content-hub";
import { displayDate as formatDate } from "./content-hub";
export function displayDate(value?: string) {
  return value ? formatDate(value) : undefined;
}
export const getNewsCopy = cache(async (): Promise<NewsCopy> => {
  const copy = await getHubCopy();
  return {
    ...newsCopy,
    ...copy,
    empty: copy.empty,
    navigationLabel: copy.navLabel,
    allLabel: copy.allNews,
    readLabel: copy.readMore,
    backLabel: copy.back,
    profileHeading: copy.profileTitle,
  };
});
export const getSoraya = cache(async (): Promise<Person> => {
  const profile = await getSorayaProfile();
  return {
    name: profile.name,
    ...(profile.role ? { role: profile.role } : {}),
    ...(profile.bio ? { bio: profile.bio } : {}),
    localImage: profile.photoUrl,
    imageAlt: profile.photoAlt,
  };
});
export function imageUrl(image?: { asset?: { _ref?: string } }) {
  const match = image?.asset?._ref?.match(
    /^image-([a-zA-Z0-9]+)-(\d+x\d+)-(jpg|jpeg|png|webp|gif)$/,
  );
  return match
    ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${match[1]}-${match[2]}.${match[3]}`
    : undefined;
}
