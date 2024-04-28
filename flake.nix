{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
    pnpm2nix = {
      url = "github:nzbr/pnpm2nix-nzbr";
      inputs = {
        nixpkgs.follows = "nixpkgs";
        flake-utils.follows = "flake-utils";
      };
    };
  };

  outputs = {
    flake-utils,
    nixpkgs,
    pnpm2nix,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          overlays = [pnpm2nix.outputs.overlays.default];
          inherit system;
        };
      in {
        devShells.default = with pkgs;
          mkShell {
            buildInputs = [
              nodejs
              nodejs.pkgs.pnpm
            ];
          };

        packages.default = pkgs.mkPnpmPackage {
          src = ./.;
        };
      }
    );
}
