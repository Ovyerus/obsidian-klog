/** @type import('prettier).Config */
module.exports = {
  plugins: [require.resolve("prettier-plugin-svelte")],
  htmlWhitespaceSensitivity: "ignore",
  proseWrap: "always",
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};
