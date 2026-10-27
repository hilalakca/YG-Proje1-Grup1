#!/usr/bin/env bash
# Kullanım:  ./make-commits.sh /yol/repo-klasorun  [dal-adi]
# Starter dosyalarını repoya sırayla, anlamlı commit’ler halinde ekler.
# Push yapmaz; sonucu "git log" ile kontrol edip kendin push’layabilirsin.
set -euo pipefail

SRC="$(cd "$(dirname "$0")/starter" && pwd)"
REPO="${1:?Repo klasörünü ver: ./make-commits.sh /yol/repo [dal-adi]}"
BRANCH="${2:-feat/hafta1-iskelet}"

git -C "$REPO" rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "Hata: $REPO bir git deposu değil."; exit 1; }
if [ -n "$(git -C "$REPO" status --porcelain)" ]; then
  echo "Hata: repoda commit edilmemiş değişiklik var. Önce onları commit’le veya sakla (git stash)."; exit 1
fi

git -C "$REPO" checkout -b "$BRANCH"

step() {  # step "mesaj" dosya1 dosya2 ...
  local msg="$1"; shift
  for f in "$@"; do
    mkdir -p "$REPO/$(dirname "$f")"
    cp "$SRC/$f" "$REPO/$f"
    git -C "$REPO" add "$f"
  done
  git -C "$REPO" commit -m "$msg"
}

step "chore: .gitignore ekle" .gitignore
step "docs: README ilk taslağı (amaç, çalıştırma, klasör yapısı, katkı kuralları)" README.md
step "docs: veri modeli açıklamasını ekle" docs/data-model.md
step "feat(data): örnek ders içeriğini ekle (data/course.json)" data/course.json
step "feat(storage): localStorage sarmalayıcısını ekle (hata toleransı, bellek yedeği)" js/storage.js
step "feat(logic): doğrulama, ilerleme hesabı, filtre ve arama fonksiyonlarını ekle" js/logic.js
step "feat(ui): sayfa iskeleti, hafta kartları, görev listesi ve tema geçişini ekle" index.html css/styles.css js/main.js

echo
echo "Tamam. '$BRANCH' dalında 7 commit oluşturuldu:"
git -C "$REPO" log --oneline -7
echo
echo "Sonraki adım:  git -C \"$REPO\" push -u origin $BRANCH   (sonra GitHub’da pull request aç)"
