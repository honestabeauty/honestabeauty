"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { BookingCTA } from "@/components/BookingCTA";
import { TreatmentFilterCta } from "@/components/conversion/TreatmentFilterCta";
import { EditorialPetalStats } from "@/components/EditorialPetalStats";
import { CmsPageHero } from "@/components/CmsPageHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RelatedPageLinks } from "@/components/RelatedPageLinks";
import { TreatmentCategoryGuide } from "@/components/TreatmentCategoryGuide";
import { TreatmentFeatureSlider } from "@/components/TreatmentFeatureSlider";
import { TreatmentMagazineGrid } from "@/components/TreatmentMagazineGrid";
import { moanaPetalStats } from "@/data/moana-stats";
import type { ContentPanel } from "@/data/page-content";
import type { Treatment } from "@/data/treatments";
import type { ResolvedPageHero } from "@/lib/cms/inner-pages";
import { handleRadioGroupKeyDown } from "@/lib/radiogroup-keyboard";

type Props = {
  treatments: Treatment[];
  featuredTreatments: Treatment[];
  hero: ResolvedPageHero;
  categoryPanels: ContentPanel[];
};

const problemsFromTreatments = (treatments: Treatment[]) => [
  "全部",
  ...Array.from(new Set(treatments.flatMap((t) => t.problems))),
];

const categoriesFromTreatments = (treatments: Treatment[]) => [
  "全部",
  ...Array.from(new Set(treatments.map((t) => t.category))),
];

function readFilterParam(
  searchParams: URLSearchParams,
  key: string,
  allowed: readonly string[],
) {
  const value = searchParams.get(key);
  return value && allowed.includes(value) ? value : "全部";
}

export default function TreatmentsPageClient({
  treatments,
  featuredTreatments,
  hero,
  categoryPanels,
}: Props) {
  const categories = categoriesFromTreatments(treatments);
  const problems = problemsFromTreatments(treatments);
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = readFilterParam(searchParams, "category", categories);
  const problem = readFilterParam(searchParams, "problem", problems);

  const updateFilter = useCallback(
    (key: "category" | "problem", value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "全部") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const query = params.toString();
      router.replace(query ? `/treatments?${query}` : "/treatments", {
        scroll: false,
      });
    },
    [router, searchParams],
  );

  const resetFilters = useCallback(() => {
    router.replace("/treatments", { scroll: false });
  }, [router]);

  const filtered = useMemo(() => {
    return treatments.filter((t) => {
      if (category !== "全部" && t.category !== category) return false;
      if (problem !== "全部" && !t.problems.includes(problem)) return false;
      return true;
    });
  }, [category, problem, treatments]);

  const sliderItems = useMemo(() => {
    if (category === "全部" && problem === "全部") {
      return featuredTreatments;
    }
    return filtered.slice(0, 6);
  }, [category, problem, filtered, featuredTreatments]);

  const hasFilters = category !== "全部" || problem !== "全部";

  return (
    <>
      <section className="moana-page">
        <div className="container-kz">
          <CmsPageHero hero={hero} />

          <TreatmentFeatureSlider treatments={sliderItems} />
          <EditorialPetalStats items={moanaPetalStats} />
          <TreatmentCategoryGuide panels={categoryPanels} />

          <div className="moana-catalog">
            <div className="moana-catalog__head">
              <div>
                <p className="moana-section-label">
                  <span className="moana-section-label__rule" aria-hidden />
                  Catalog
                </p>
                <h2 className="moana-catalog__title">
                  全部療程
                  <span className="moana-catalog__count" aria-label={`共 ${filtered.length} 項`}>
                    {filtered.length}
                  </span>
                </h2>
              </div>
            </div>

            <div className="moana-filters">
              <div className="moana-filters__row">
                <span className="moana-filters__label" id="filter-category-label">
                  類型
                </span>
                <div
                  className="moana-filters__chips"
                  role="radiogroup"
                  aria-labelledby="filter-category-label"
                  onKeyDown={(event) =>
                    handleRadioGroupKeyDown(event, {
                      values: categories,
                      current: category,
                      onChange: (value) => updateFilter("category", value),
                    })
                  }
                >
                  {categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      role="radio"
                      aria-checked={category === c}
                      data-cta-id={`cta_filter_category_${c}`}
                      onClick={() => updateFilter("category", c)}
                      className={`moana-filters__chip ${
                        category === c ? "moana-filters__chip--active" : ""
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="moana-filters__row">
                <span className="moana-filters__label" id="filter-problem-label">
                  肌膚
                </span>
                <div
                  className="moana-filters__chips moana-filters__chips--scroll"
                  role="radiogroup"
                  aria-labelledby="filter-problem-label"
                  onKeyDown={(event) =>
                    handleRadioGroupKeyDown(event, {
                      values: problems,
                      current: problem,
                      onChange: (value) => updateFilter("problem", value),
                    })
                  }
                >
                  {problems.map((p) => (
                    <button
                      key={p}
                      type="button"
                      role="radio"
                      aria-checked={problem === p}
                      data-cta-id={`cta_filter_problem_${p}`}
                      onClick={() => updateFilter("problem", p)}
                      className={`moana-filters__chip ${
                        problem === p ? "moana-filters__chip--active" : ""
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              {hasFilters && (
                <button
                  type="button"
                  className="moana-filters__reset"
                  data-cta-id="cta_filter_reset"
                  onClick={resetFilters}
                >
                  清除篩選
                </button>
              )}
            </div>

            <TreatmentFilterCta
              category={category}
              problem={problem}
              count={filtered.length}
            />

            {filtered.length > 0 ? (
              <TreatmentMagazineGrid treatments={filtered} />
            ) : (
              <p className="moana-empty">
                沒有符合條件的療程。
                <button
                  type="button"
                  className="moana-filters__reset moana-filters__reset--inline"
                  data-cta-id="cta_filter_reset_empty"
                  onClick={resetFilters}
                >
                  查看全部
                </button>
              </p>
            )}
          </div>

          <RelatedPageLinks path="/treatments" />
        </div>
      </section>

      <ProcessSteps showCta />
      <BookingCTA ctaIdPrefix="cta_treatments_footer" />
    </>
  );
}
