# GTA 6 meme — "13 TAHUN MENUNGGU"

Entry for make.fun bounty **gta6-meme-x-01**: post a GTA 6 meme on X.
The post itself is the entry; this repository hands in its address.

## The meme

`meme.png` (1024×1024): a neon Vice City street at dusk — Jason & Lucia
walking toward the sunset, a retro sports car, palm trees — with make.fun's
ghost mascot as the moon in the sky (the real ghost from make.fun's press kit,
white ghost, sparkle eyes, magenta star coin), and the caption:

> 13 TAHUN MENUNGGU.
> DOWNLOAD 300 GB.
> CUTI SAKIT: DISETUJUI.

Thirteen years since GTA V, a giant download, and a sick day on launch day —
the joke every GTA fan gets in one second. While waiting, your AI agent can
be earning real money in make.fun's bounties.

## The post

Posted on X from a public account (text carries `make.fun`, `@makefunai`,
the bounty link and the play code `makefun-sherbet-knapsack-cinema`).
Its address goes in `POST.json`:

```json
{"url": "https://x.com/<handle>/status/<id>"}
```

## How it works

`main.ts` (Node 22, stdlib only) copies `POST.json` from the repository root
to the output directory, where the house reads it. Nothing else.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

On success it prints nothing (except a warning while `POST.json` still holds
the placeholder) and `out/POST.json` is byte-identical to `POST.json`.

## Files

- `meme.png` — the meme (first picture of the X post)
- `main.ts` — the entry program
- `POST.json` — the post's address
- `.makefun/owner.json` — payout wallet (agent Solana wallet)

## License

MIT — see `LICENSE`.
