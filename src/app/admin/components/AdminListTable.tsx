"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { AdminDeleteForm } from "@/app/admin/components/AdminDeleteForm";

export type SortType = "string" | "number" | "date";

export type AdminListColumn = {
  key: string;
  label: string;
  width?: "sm" | "md" | "lg" | "actions";
  truncate?: boolean;
  sortable?: boolean;
  sortType?: SortType;
};

export type AdminListRow = {
  id: string;
  values: Record<string, string | null | undefined>;
  sortValues?: Record<string, string | number>;
  status?: "published" | "draft" | "scheduled";
  category?: string | null;
  editHref?: string;
  previewHref?: string;
  deleteId?: string;
  deleteLabel?: string;
  searchText: string;
};

type Props = {
  rows: AdminListRow[];
  columns: AdminListColumn[];
  hint?: string;
  searchPlaceholder?: string;
  pageSize?: number;
  emptyMessage?: string;
  deleteAction?: (formData: FormData) => Promise<void>;
  reorderAction?: (formData: FormData) => Promise<void>;
  reorderHint?: string;
};

const PAGE_SIZES = [15, 25, 50] as const;

function StatusBadge({ status }: { status: "published" | "draft" | "scheduled" }) {
  const label = status === "draft" ? "草稿" : status === "scheduled" ? "預定發布" : "已發布";
  const modifier =
    status === "draft"
      ? "kz-admin__badge--draft"
      : status === "scheduled"
        ? "kz-admin__badge--scheduled"
        : "";

  return <span className={`kz-admin__badge ${modifier}`}>{label}</span>;
}

function cellSortValue(row: AdminListRow, key: string, sortType: SortType) {
  const raw = row.sortValues?.[key] ?? row.values[key] ?? "";
  if (sortType === "number") return Number(raw) || 0;
  if (sortType === "date") return String(raw);
  return String(raw).toLowerCase();
}

function compareRows(
  a: AdminListRow,
  b: AdminListRow,
  key: string,
  sortType: SortType,
  dir: "asc" | "desc",
) {
  const av = cellSortValue(a, key, sortType);
  const bv = cellSortValue(b, key, sortType);
  let cmp = 0;
  if (sortType === "number") {
    cmp = (av as number) - (bv as number);
  } else {
    cmp = String(av).localeCompare(String(bv), "zh-Hant");
  }
  return dir === "asc" ? cmp : -cmp;
}

function reorderIdList(ids: string[], fromId: string, toId: string) {
  if (fromId === toId) return ids;
  const next = ids.filter((id) => id !== fromId);
  const targetIndex = next.indexOf(toId);
  if (targetIndex === -1) return ids;
  next.splice(targetIndex, 0, fromId);
  return next;
}

export function AdminListTable({
  rows,
  columns,
  hint,
  searchPlaceholder = "搜尋…",
  pageSize: defaultPageSize = 15,
  emptyMessage = "沒有符合條件的項目",
  deleteAction,
  reorderAction,
  reorderHint = "拖曳左側把手調整前台顯示順序，放開後自動儲存。",
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "scheduled">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [idOrder, setIdOrder] = useState<string[]>(() => rows.map((r) => r.id));
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  useEffect(() => {
    setIdOrder(rows.map((r) => r.id));
  }, [rows]);

  const rowMap = useMemo(() => new Map(rows.map((r) => [r.id, r])), [rows]);

  const orderedRows = useMemo(
    () =>
      idOrder
        .map((id) => rowMap.get(id))
        .filter((row): row is AdminListRow => Boolean(row)),
    [idOrder, rowMap],
  );

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const row of rows) {
      if (row.category?.trim()) set.add(row.category.trim());
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "zh-Hant"));
  }, [rows]);

  const isFiltered =
    query.trim() !== "" || statusFilter !== "all" || categoryFilter !== "all";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orderedRows.filter((row) => {
      if (statusFilter !== "all" && row.status !== statusFilter) return false;
      if (categoryFilter !== "all" && row.category !== categoryFilter) return false;
      if (q && !row.searchText.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [orderedRows, query, statusFilter, categoryFilter]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const col = columns.find((c) => c.key === sortKey);
    const sortType = col?.sortType ?? "string";
    return [...filtered].sort((a, b) => compareRows(a, b, sortKey, sortType, sortDir));
  }, [filtered, sortKey, sortDir, columns]);

  const usePagination = !reorderAction || isFiltered;
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = usePagination ? (safePage - 1) * pageSize : 0;
  const pageRows = usePagination
    ? sorted.slice(start, start + pageSize)
    : sorted;

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const publishedCount = rows.filter((r) => r.status === "published").length;
  const scheduledCount = rows.filter((r) => r.status === "scheduled").length;
  const draftCount = rows.filter((r) => r.status === "draft").length;

  function resetPage() {
    setPage(1);
  }

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    resetPage();
  }

  const persistOrder = useCallback(
    (nextIds: string[]) => {
      if (!reorderAction) return;
      startTransition(async () => {
        const fd = new FormData();
        fd.set("ids", JSON.stringify(nextIds));
        await reorderAction(fd);
        router.refresh();
      });
    },
    [reorderAction, router],
  );

  function handleDrop(targetId: string) {
    if (!reorderAction || !dragId) return;
    const next = reorderIdList(idOrder, dragId, targetId);
    setIdOrder(next);
    setDragId(null);
    setDragOverId(null);
    persistOrder(next);
  }

  return (
    <div className="kz-admin__list">
      {hint ? <p className="kz-admin__list-hint">{hint}</p> : null}
      {reorderAction && !isFiltered ? (
        <p className="kz-admin__list-hint kz-admin__list-hint--reorder">
          {reorderHint}
          {isPending ? " · 儲存中…" : null}
        </p>
      ) : null}
      {reorderAction && isFiltered ? (
        <p className="kz-admin__list-hint kz-admin__list-hint--warn">
          已套用搜尋或篩選；清除後可拖曳調整全站排序。
        </p>
      ) : null}

      <div className="kz-admin__list-toolbar">
        <div className="kz-admin__list-toolbar__primary">
          <label className="kz-admin__list-search">
            <span className="sr-only">搜尋</span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                resetPage();
              }}
              placeholder={searchPlaceholder}
            />
          </label>
          <select
            className="kz-admin__list-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as typeof statusFilter);
              resetPage();
            }}
            aria-label="篩選狀態"
          >
            <option value="all">全部狀態（{rows.length}）</option>
            <option value="published">已發布（{publishedCount}）</option>
            <option value="scheduled">預定發布（{scheduledCount}）</option>
            <option value="draft">草稿（{draftCount}）</option>
          </select>
          {categories.length > 1 ? (
            <select
              className="kz-admin__list-select"
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                resetPage();
              }}
              aria-label="篩選分類"
            >
              <option value="all">全部分類</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        <p className="kz-admin__list-count" aria-live="polite">
          {filtered.length === rows.length
            ? `共 ${rows.length} 筆`
            : `顯示 ${filtered.length} / ${rows.length} 筆`}
        </p>
      </div>

      <div className="kz-admin__table-wrap">
        <table className="kz-admin__table kz-admin__table--list">
          <thead>
            <tr>
              {reorderAction ? (
                <th className="kz-admin__col--drag" aria-label="排序" />
              ) : null}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={col.width ? `kz-admin__col--${col.width}` : undefined}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      className={`kz-admin__sort-btn ${
                        sortKey === col.key ? "kz-admin__sort-btn--active" : ""
                      }`}
                      onClick={() => toggleSort(col.key)}
                    >
                      {col.label}
                      <span className="kz-admin__sort-icon" aria-hidden>
                        {sortKey === col.key ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
                      </span>
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
              <th className="kz-admin__col--actions">操作</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1 + (reorderAction ? 1 : 0)}
                  className="kz-admin__list-empty"
                >
                  {rows.length === 0 ? "尚無資料" : emptyMessage}
                </td>
              </tr>
            ) : (
              pageRows.map((row) => {
                const canDrag = Boolean(reorderAction && !isFiltered);
                return (
                  <tr
                    key={row.id}
                    className={[
                      dragOverId === row.id ? "kz-admin__row--drag-over" : "",
                      dragId === row.id ? "kz-admin__row--dragging" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onDragOver={(e) => {
                      if (!canDrag) return;
                      e.preventDefault();
                      setDragOverId(row.id);
                    }}
                    onDragLeave={() => {
                      if (dragOverId === row.id) setDragOverId(null);
                    }}
                    onDrop={(e) => {
                      if (!canDrag) return;
                      e.preventDefault();
                      handleDrop(row.id);
                    }}
                  >
                    {reorderAction ? (
                      <td className="kz-admin__col--drag">
                        {canDrag ? (
                          <button
                            type="button"
                            className="kz-admin__drag-handle"
                            draggable
                            aria-label={`拖曳調整「${row.values.title ?? row.values.question ?? row.id}」順序`}
                            onDragStart={(e) => {
                              setDragId(row.id);
                              e.dataTransfer.effectAllowed = "move";
                            }}
                            onDragEnd={() => {
                              setDragId(null);
                              setDragOverId(null);
                            }}
                          >
                            ⠿
                          </button>
                        ) : (
                          <span className="kz-admin__drag-handle kz-admin__drag-handle--muted">⠿</span>
                        )}
                      </td>
                    ) : null}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={[
                          col.width ? `kz-admin__col--${col.width}` : "",
                          col.truncate ? "kz-admin__cell--truncate" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        title={col.truncate ? row.values[col.key] ?? undefined : undefined}
                      >
                        {col.key === "status" && row.status ? (
                          <StatusBadge status={row.status} />
                        ) : (
                          row.values[col.key] ?? "—"
                        )}
                      </td>
                    ))}
                    <td className="kz-admin__col--actions">
                      <div className="kz-admin__row-actions">
                        {row.editHref ? (
                          <Link href={row.editHref} className="kz-admin__row-action">
                            編輯
                          </Link>
                        ) : null}
                        {row.previewHref ? (
                          <Link
                            href={row.previewHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="kz-admin__row-action kz-admin__row-action--muted"
                          >
                            前台 ↗
                          </Link>
                        ) : null}
                        {row.deleteId && deleteAction ? (
                          <AdminDeleteForm
                            action={deleteAction}
                            hidden={{ id: row.deleteId }}
                            confirmMessage={row.deleteLabel ?? "確定刪除此項目？"}
                          >
                            <button
                              type="submit"
                              className="kz-admin__row-action kz-admin__row-action--danger"
                            >
                              刪除
                            </button>
                          </AdminDeleteForm>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {sorted.length > 0 && usePagination ? (
        <div className="kz-admin__list-footer">
          <div className="kz-admin__list-pagesize">
            <label htmlFor="admin-list-pagesize">每頁</label>
            <select
              id="admin-list-pagesize"
              className="kz-admin__list-select kz-admin__list-select--sm"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {PAGE_SIZES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="kz-admin__pagination">
            <button
              type="button"
              className="kz-admin__page-btn"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              上一頁
            </button>
            <span className="kz-admin__page-info">
              第 {safePage} / {totalPages} 頁
              <span className="kz-admin__page-range">
                （{start + 1}–{Math.min(start + pageSize, sorted.length)}）
              </span>
            </span>
            <button
              type="button"
              className="kz-admin__page-btn"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              下一頁
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
