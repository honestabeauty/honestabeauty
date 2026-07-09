import {
  DEFAULT_HOME_SECTION_ORDER,
  HOME_SECTION_IDS,
  HOME_SECTION_REGISTRY,
  type HomeSectionContent,
  type HomeSectionId,
} from "@/data/home-sections";
import { getSiteSettingsData, type HomeSectionsConfig } from "@/lib/cms/site";

export type ResolvedHomeSection = {
  id: HomeSectionId;
  enabled: boolean;
  content: HomeSectionContent;
  editableFields: readonly string[];
};

function pickContent(
  defaults: HomeSectionContent,
  overrides?: HomeSectionContent,
): HomeSectionContent {
  const merged: HomeSectionContent = { ...defaults };
  if (!overrides) return merged;
  for (const [key, value] of Object.entries(overrides)) {
    if (key === "enabled") continue;
    if (typeof value === "string" && value.trim()) {
      (merged as Record<string, string>)[key] = value.trim();
    }
  }
  return merged;
}

function migrateSectionId(raw: string): string {
  return raw === "men-care" ? "women-care" : raw;
}

function normalizeOrder(order?: string[]): HomeSectionId[] {
  const seen = new Set<HomeSectionId>();
  const result: HomeSectionId[] = [];

  for (const raw of order ?? DEFAULT_HOME_SECTION_ORDER) {
    const migrated = migrateSectionId(raw);
    if (!HOME_SECTION_IDS.includes(migrated as HomeSectionId)) continue;
    const id = migrated as HomeSectionId;
    if (seen.has(id)) continue;
    seen.add(id);
    result.push(id);
  }

  for (const id of HOME_SECTION_IDS) {
    if (!seen.has(id)) result.push(id);
  }

  return result;
}

export function mergeHomeSections(config?: HomeSectionsConfig | null): ResolvedHomeSection[] {
  const order = normalizeOrder(config?.order);
  const sectionMap = config?.sections ?? {};

  return order.map((id) => {
    const def = HOME_SECTION_REGISTRY[id];
    const saved = sectionMap[id] ?? (id === "women-care" ? sectionMap["men-care"] : undefined);
    return {
      id,
      enabled: saved?.enabled ?? def.defaultEnabled,
      content: pickContent(def.defaults, saved),
      editableFields: def.editableFields,
    };
  });
}

export async function getHomeSections(): Promise<ResolvedHomeSection[]> {
  const settings = await getSiteSettingsData();
  return mergeHomeSections(settings?.homeSections);
}
