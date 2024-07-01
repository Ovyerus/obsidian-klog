{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
  };

  outputs = {nixpkgs, ...}: let
    forSystems = fn:
      nixpkgs.lib.genAttrs [
        "aarch64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
        "x86_64-linux"
      ] (system: fn nixpkgs.legacyPackages.${system});
    defaultForSystems = fn: forSystems (pkgs: {default = fn pkgs;});
  in {
    packages = defaultForSystems (pkgs: pkgs.callPackage ./package.nix {});
    devShells = defaultForSystems (pkgs: with pkgs; mkShell {buildInputs = [nodejs pnpm];});
  };
}
