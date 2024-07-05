{
  lib,
  stdenv,
  nodejs,
  pnpm,
}: let
  packageJSON = builtins.fromJSON (builtins.readFile ./package.json);
in
  stdenv.mkDerivation (finalAttrs: {
    pname = packageJSON.name;
    version = packageJSON.version;

    src = lib.cleanSource ./.;

    pnpmDeps = pnpm.fetchDeps {
      inherit (finalAttrs) pname version src;
      hash = "sha256-YrJpBWzcTksjfcQP4oP3TUd4uYi0y50ZJQ0Ma2H+ZAQ=";
    };

    nativeBuildInputs = [nodejs pnpm.configHook];

    buildPhase = ''
      runHook preBuild

      pnpm build

      runHook postBuild
    '';

    installPhase = ''
      runHook preInstall

      mkdir -p $out
      cp -r dist/* $out/

      runHook postInstall
    '';
  })
