import { SETTINGS } from "../settings/settings";

export function checkGroup(group){
  if (group < SETTINGS.GROUPS_COUNT) return group
  return 0
}

export function checkPage(page){
  if (page < SETTINGS.PAGES_COUNT) return page
  return 0
}