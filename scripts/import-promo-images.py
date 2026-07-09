"""Import Instagram/promo images into public/images/promo/."""
from __future__ import annotations

import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = (
    Path.home()
    / ".cursor"
    / "projects"
    / "c-Users-Steriod-Desktop-elsashop"
    / "assets"
)
OUT = ROOT / "public" / "images" / "promo"
MANIFEST = ROOT / "src" / "data" / "promo-images.json"

# instagram media id -> slug filename + metadata
MAPPING: dict[str, dict[str, str]] = {
    "619134055": {"file": "plaser-rf", "title": "PLASER 隔空離子熱能射頻", "treatment": "plaser-rf"},
    "610682319": {"file": "tegoder-peel", "title": "TEGODER 量膚定制果酸", "treatment": "tegoder-peel"},
    "616276711": {"file": "plasma-acne", "title": "等離子抗痘煥膚", "treatment": "plasma-acne"},
    "612421347": {"file": "plasma-peel", "title": "等離子煥膚", "treatment": "plasma-peel"},
    "469641557": {"file": "hero-shop", "title": "康姿健屯門小店", "treatment": ""},
    "654030090": {"file": "exosome", "title": "外泌體細胞修復", "treatment": "exosome"},
    "655436967": {"file": "hifu", "title": "HIFU 緊緻拉提", "treatment": "hifu"},
    "626189000": {"file": "microneedle-rf", "title": "m.pen 微針煥膚", "treatment": "microneedle-rf"},
    "656277400": {"file": "collazen-triple", "title": "COLLAZEN 一打三黑科技", "treatment": "collazen"},
    "626828883": {"file": "collazen-5in1", "title": "COLLAZEN 膠原美肌小旋風 5合1", "treatment": "collazen"},
    "641753737": {"file": "brand-opening", "title": "康姿健開工大吉", "treatment": ""},
    "635279113": {"file": "collazen-hifu-rf", "title": "COLLAZEN HIFU RF 增效", "treatment": "collazen"},
    "642537783": {"file": "laser-spot", "title": "Ruikd Genelux Lite 納秒激光", "treatment": "laser-spot"},
    "652032110": {"file": "air-plaser", "title": "Air Plaser 等離子", "treatment": "plaser-rf"},
    "657711985": {"file": "collazen-atoz", "title": "COLLAZEN 膠原小旋風 A to Z", "treatment": "collazen"},
    "648345329": {"file": "dr-rainbow-fir", "title": "Dr. Rainbow 遠紅外線", "treatment": ""},
    "657461485": {"file": "seasonal-skincare", "title": "轉季護膚小貼士", "treatment": ""},
    "682645805": {"file": "spanish-facial", "title": "西班牙醫學級人手 Facial", "treatment": ""},
    "700208007": {"file": "dr-face", "title": "Dr. Face 遠紅外線童顏機", "treatment": ""},
    "669601128": {"file": "wellness-detox", "title": "養生排毒 Dr. Rainbow", "treatment": ""},
    "710556540": {"file": "event-prep", "title": "重要日子前大掃除", "treatment": ""},
    "719609596": {"file": "sensitive-repair", "title": "脆弱肌修護方案", "treatment": "tegoder-peel"},
    "719891423": {"file": "me-time", "title": "享受 Me Time 無壓力美容", "treatment": ""},
}


def win_path(path: Path) -> str:
    resolved = str(path.resolve())
    if len(resolved) >= 240 and not resolved.startswith("\\\\?\\"):
        return "\\\\?\\" + resolved
    return resolved


def find_asset(media_id: str) -> Path | None:
    if not ASSETS.exists():
        return None
    for path in ASSETS.iterdir():
        if media_id in path.name and path.suffix.lower() == ".png":
            if path.exists() or Path(win_path(path)).exists():
                return path
    return None


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    items: list[dict] = []
    missing: list[str] = []

    for media_id, meta in MAPPING.items():
        src = find_asset(media_id)
        if not src:
            missing.append(media_id)
            continue
        dest_name = f"{meta['file']}.png"
        dest = OUT / dest_name
        shutil.copy2(win_path(src), win_path(dest))
        items.append(
            {
                "id": meta["file"],
                "mediaId": media_id,
                "file": f"/images/promo/{dest_name}",
                "title": meta["title"],
                "treatment": meta["treatment"] or None,
            }
        )

    MANIFEST.write_text(
        json.dumps({"count": len(items), "items": items}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"imported: {len(items)}")
    if missing:
        print(f"missing: {len(missing)} -> {missing}")
    return 0 if not missing else 1


if __name__ == "__main__":
    raise SystemExit(main())
