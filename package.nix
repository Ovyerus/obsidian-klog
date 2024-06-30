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
      hash = "sha256-yWX539W0b1R4YpIcDEVjCl3GzxI8kkpgT8GkCBrrY60=";
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
      cp -r {dist/main.js,manifest.json} $out/

      runHook postInstall
    '';
  })
